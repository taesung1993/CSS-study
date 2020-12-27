const container = document.querySelector(".area");
const box = container.querySelector(".area__box");

const {width:containerWidth, height:containerHeight} = container.getBoundingClientRect();
const {width:boxWidth, height:boxHeight} = box.getBoundingClientRect();
let isDragging = null;
let originLeft = null;
let originTop = null;
let originX = null;
let originY = null;

box.addEventListener("mousedown", (e) => {
    isDragging = true;
    originX = e.clientX;
    originY = e.clientY;
    originLeft = box.offsetLeft;
    originTop = box.offsetTop;
});

document.body.addEventListener("mouseup", (e) => {
    isDragging = false;
});

container.addEventListener("mousemove", (e) => {
    const targetClass = e.target.className;

    if(isDragging && targetClass === "area__box"){
        const diffX = e.clientX - originX;
        const diffY = e.clientY - originY;
        const endOfXPoint = containerWidth - boxWidth;
        const endOfYPoint = containerHeight - boxHeight;
        e.target.style.left = `${Math.min(Math.max(0, originLeft+diffX), endOfXPoint)}px`;
        e.target.style.top = `${Math.min(Math.max(0, originTop + diffY), endOfYPoint)}px`;
    }
});