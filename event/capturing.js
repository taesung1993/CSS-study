const handler = (event) => {
    const phase = ['캡처링', '타깃', '버블링'];
    console.log("노드 이름: ",event.currentTarget.nodeName);
    console.log("이벤트 흐름 phase", phase[event.eventPhase-1]);
}

document.getElementById("target").addEventListener("click", handler, true);
document.querySelector('fieldset').addEventListener('click', handler, true);
document.querySelector('body').addEventListener('click', handler, true);
document.querySelector('html').addEventListener('click', handler, true);