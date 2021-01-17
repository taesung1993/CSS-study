let fileList = []; 

document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
    const dropZoneElement = inputElement.closest(".drop-zone");
    
    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if(inputElement.files.length){
            updateThumbnail(dropZoneElement, inputElement.files);
        }
    });

    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if(e.dataTransfer.files.length){
            inputElement.files = e.dataTransfer.files;
            fileList = [...fileList, ...inputElement.files];
            updateThumbnail(dropZoneElement, inputElement.files);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

function updateThumbnail(dropZoneElement, files){
    if(dropZoneElement.querySelector(".drop-zone__prompt")){
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    for(let i=0; i<files.length; i++){
        const thumbnailElement = document.createElement("div");
        const file = files.item(i);
        
        thumbnailElement.classList.add("drop-zone__thumb");
        thumbnailElement.dataset.label = file.name;
        dropZoneElement.appendChild(thumbnailElement);

        if(file.type.startsWith("image/")){
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                thumbnailElement.style.backgroundImage = `url(${reader.result})`;
                thumbnailElement.style.backgroundPosition = 'center center';
            }
        }
        else{
            thumbnailElement.style.backgroundImage = null;
        }
    }
}