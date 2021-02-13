const handler = (event) => {
    const phase = ['캡처링', '타깃', '버블링'];
    console.log("노드 이름: ",event.currentTarget.nodeName);
    console.log("이벤트 흐름 phase", phase[event.eventPhase-1]);
}

const stopHander = (event) => {
    console.log(`${event.currentTarget.nodeName} 까지만 버블링 됩니다.`);
    event.stopPropagation();
}

document.getElementById("target").addEventListener("click", handler);
document.querySelector('fieldset').addEventListener('click', stopHander);
document.querySelector('body').addEventListener('click', handler);
document.querySelector('html').addEventListener('click', handler);