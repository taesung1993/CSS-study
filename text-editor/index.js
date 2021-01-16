/* iframe 태그의 name 속성은 자바스크립트 요소를 참조하는데 사용할 수 있다. */
// https://www.youtube.com/watch?v=fOKaD4NXHIs
const buttons = document.querySelectorAll('button');
const btnForm = document.querySelector(".btns-form");
let showCode = true;

textField.document.designMode = "On";

btnForm.addEventListener("click", async(e) => {
    const cmd = e.target.closest('button').getAttribute('data-cmd');
    switch(cmd){
        case 'insertImage':
        case 'createLink':
            const url = await prompt('Enter Link Here: ', "");
            textField.document.execCommand(cmd, false, url);

            const atags = textField.document.querySelectorAll("a");
            atags.forEach((atag) => {
                atag.target = "_blank";
                atag.addEventListener("mouseover", (e) => {textField.document.designMode = "Off"; });
                atag.addEventListener("mouseout", (e) => {textField.document.designMode = "On"; });
            });
            break;
        case 'showCode':
            const textFieldBody = textField.document.querySelector("body"); 
            if(showCode){
                textFieldBody.textContent = textFieldBody.innerHTML;
                showCode = false;
            }
            else{
                textFieldBody.innerHTML = textFieldBody.textContent;
                showCode = true;
            }
            break;
        default:
            textField.document.execCommand(cmd, false, null);
            break;
    }
});

// for(let i=0; i<buttons.length; i++){
//     buttons[i].addEventListener('click', () => {
//         let cmd = buttons[i].getAttribute('data-cmd');
//         if(buttons[i].name === 'active'){
//             buttons[i].classList.toggle('active');
//         }
//         if(cmd === "insertImagesFile" || cmd === "createLink"){
//             let url = prompt("Enter link here: ", "");
//             textField.document.execCommand(cmd, false, url);
//         }
//         else{
//             textField.document.execCommand(cmd, false, null);
//         }
//     });
// }