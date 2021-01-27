const appliedCommandToEditor = (e) => {
    const btn = e.target.closest(".icon-container");

    if(btn){
        const cmd = btn.dataset.cmd;
        switch(cmd){
            case 'createLink':
                linkModal.classList.remove("hidden");
                break;
            default:
                console.log(cmd);
                textEditorField.document.execCommand(cmd, false, null);
                break;
        }
    }
}

btnList.addEventListener("click", appliedCommandToEditor);

[modalCloseBtn, modalCancleBtn].forEach((closeBtn) => {
    console.log(closeBtn);
    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        linkModal.classList.add("hidden");
    })
});

modalComplete.addEventListener("click", (e) => {
    e.preventDefault();
    const link = modalInput.value;
    const cmd = 'createLink';
    modalInput.value = "";
    textEditorField.document.execCommand(cmd, false, link);
    linkModal.classList.add("hidden");
});