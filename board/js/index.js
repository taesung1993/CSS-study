const btnList = document.querySelector(".text-editor__icon-list");
const jsChangeFontSize = document.getElementById("jsChangeFontSize");
const linkModal = document.querySelector(".link-modal--container");
const modalCloseBtn = linkModal.querySelector(".modal-close-btn");
const modalInput = linkModal.querySelector(".link-form__input");
const modalComplete = document.getElementById("jsEnterHpyerLink");
const modalCancleBtn = document.getElementById("jsCloseLinkModal");
const dragAndDropModal = document.querySelector(".drag-drop-modal--container");
const dragZone = document.querySelector(".drag-drop-modal__form");
const dropZone = document.querySelector(".drag-drop-modal__dropzone");

let isPalleteFromTextColor = false;
let isPalleteFromTextBgColor = false;

textEditorField.document.designMode = "On";