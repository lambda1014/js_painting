const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraseBtn = document.getElementById("jsErase");
const colorPick = document.querySelector(".jsColorPick");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

/* canvas includes context (HTML element)
context means pixels 
path means lines*/
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; //line color
ctx.fillStyle = INITIAL_COLOR; //rect color
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    //offset is (x,y) in canvas
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y); //like moving a pen, line start point

    }else{
        ctx.lineTo(x,y);
        ctx.stroke()
    }
}

function handleColorClick(event){
    /* 먼저 console.log(event.target.style)해서 들어있는 요소들 확인 */
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling===true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //x, y, width, height
    }
}

function handleSaveClick(){
    const name = window.prompt("저장할 이미지파일의 이름을 입력해주세요");
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = name; //download : directly URL download
    link.click();
}

/* 마우스 우클릭 */
function handleCM(){
    event.preventDefault(); /* 우클릭 금지 */
}

function handleEraseClick(){
    const color = "white";
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleColorPick(event){
    const color = event.target.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //mousedown means mouse click event
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

/* colors라는 array 만든 후, 배열 내 요소 각각을 color라고 임의 지정. color 각각이 click 될때마다 함수 실행 */
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

if(eraseBtn){
    eraseBtn.addEventListener("click", handleEraseClick);
}

if(colorPick){
    colorPick.addEventListener("input", handleColorPick);
}