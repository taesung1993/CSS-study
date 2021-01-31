const appliedCommandToEditor = (e) => {
    const btn = e.target.closest(".icon-container");

    if(btn){
        const cmd = btn.dataset.cmd;
        switch(cmd){
            case 'createLink':
                linkModal.classList.remove("hidden");
                /* link 모달 취소 버튼 눌렀을 때 또는 닫기 버튼을 눌렀을 때 모달을 숨긴다.*/
                [modalCloseBtn, modalCancleBtn].forEach((closeBtn) => {
                    closeBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        linkModal.classList.add("hidden");
                    })
                });
                /* URL 입력 후, 확인 버튼을 누르면 URL이 텍스트 에디터에 삽입되어 입력된다. */
                modalComplete.addEventListener("click", (e) => {
                    e.preventDefault();
                    const link = modalInput.value;
                    const cmd = 'createLink';
                    modalInput.value = "";
                    textEditorField.document.execCommand(cmd, false, link);
                    linkModal.classList.add("hidden");
                });
                break;
            case 'uploadImage':
                dragAndDropModal.classList.remove("hidden");
                dragAndDropModalClose.addEventListener("click", () => {
                    dragAndDropModal.classList.add("hidden");
                });   
                break;
            default:
                console.log(cmd);
                textEditorField.document.execCommand(cmd, false, null);
                break;
        }
    }
}

const fileIsDragedOver = (e) => {
    e.preventDefault();
}
const fileIsDragedDrop = (e) => {
    e.preventDefault();
    const urls = [];
    const thumbnailContainer = document.createElement("div");
    const fileList = e.dataTransfer.files;
    let reader = new FileReader();
    
    thumbnailContainer.classList.add("uploaded-box");
    
    for(let i=0; i<fileList.length; i++){
        const file = fileList.item(i);
        
        if(file.type.startsWith("image/")){
            const thumbnail = document.createElement("div");
            thumbnail.classList.add("thumbnail");
            thumbnailContainer.appendChild(thumbnail);

            reader.readAsDataURL(file);
            reader.onload = () => {
                const uploadBtn = document.getElementById("uploadBtn");
                const uploadThumbnail = (e) => {
                    e.preventDefault();
                    if(reader){
                        textEditorField.document.execCommand("insertImage", false, reader.result);
                        /* reader 값을 null로 설정해줌으로써, 이전에 업로드한 사진까지 올라오는 것을 막는다. */
                        reader = null;
                    }
                }

                thumbnail.style.backgroundImage = `url(${reader.result})`;
                thumbnail.style.backgroundSize = "cover";
                thumbnail.style.backgroundPosition = "center center";
                
                /* 업로드 버튼 눌렀을 때 동작 */
                uploadBtn.addEventListener("click", uploadThumbnail);
            };
        }
    }

    dragZone.appendChild(thumbnailContainer);
}

/* 이벤트 위임을 이용하여 버튼 제어*/
btnList.addEventListener("click", appliedCommandToEditor);
dragZone.addEventListener("dragover", fileIsDragedOver);
dragZone.addEventListener("drop", fileIsDragedDrop);
