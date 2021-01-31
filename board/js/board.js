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
                const dragAndDropModalClose = document.querySelector(".drag-drop-modal__close"); // 닫기 버튼(X)
                const cancelBtnInModal = document.getElementById("cancelBtnInModal"); //취소 버튼
                const closeBtns = [dragAndDropModalClose, cancelBtnInModal];

                const fileIsDragedOver = (e) => {
                    e.preventDefault();
                }
                const fileIsDragedDrop = (e) => {
                    e.preventDefault();
                    /* 이벤트 버블링 막기, 이미지가 중복으로 올라가는 것을 방지*/
                    e.stopImmediatePropagation();
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
                                const uploadBtn = document.getElementById("imageUploadBtnInModal");
                                const uploadThumbnail = (e) => {
                                    e.preventDefault();
                                    const thumbnailBox = document.querySelector(".uploaded-box");
                                    if(reader){
                                        textEditorField.document.execCommand("insertImage", false, reader.result);
                                        /* reader 값을 null로 설정해줌으로써, 이전에 업로드한 사진까지 올라오는 것을 막는다. */
                                        reader = null;
                                    }
                                    if(thumbnailBox){
                                        /* 썸네일 박스가 등록되어 있다면, 이를 제거한다. */
                                        dragZone.removeChild(thumbnailBox);
                                    }
                                    /* 모달을 닫는다. */
                                    dragAndDropModal.classList.add("hidden");
                                }
                
                                thumbnail.style.backgroundImage = `url(${reader.result})`;
                                thumbnail.style.backgroundSize = "cover";
                                thumbnail.style.backgroundPosition = "center center";
                                
                                /* 업로드 버튼 눌렀을 때 동작 */
                                uploadBtn.addEventListener("click", uploadThumbnail, true);
                            };
                        }
                    }
                
                    dragZone.appendChild(thumbnailContainer);
                }

                const processCloseBtn = (e) => {
                    e.preventDefault();
                    /* 썸네일 박스를 지우고, reader를 초기화 시킨다. */
                    const thumbnailBox = document.querySelector(".uploaded-box");
                    if(thumbnailBox){
                        dragZone.removeChild(thumbnailBox);
                    }
                    reader = null;
                    dragAndDropModal.classList.add("hidden");
                }

                /* 
                   드래그 오버: curentTarget 태그에 드래그 오버 시, 브라우저 새 탭이 열리지 않는다. 
                   드랍: 파일을 해당 태그에 드랍했을 때 동작하는 이벤트 함수
                */
                 
                dragZone.addEventListener("dragover", fileIsDragedOver);
                dragZone.addEventListener("drop", fileIsDragedDrop);

                dragAndDropModal.classList.remove("hidden");   

                /* 취소 버튼, x표 버튼 모달 닫기 처리 */
                closeBtns.forEach((closeBtn) => {
                    closeBtn.addEventListener("click", processCloseBtn);
                });
                break;
            default:
                textEditorField.document.execCommand(cmd, false, null);
                break;
        }
    }
}


/* 이벤트 위임을 이용하여 버튼 제어*/
btnList.addEventListener("click", appliedCommandToEditor);
