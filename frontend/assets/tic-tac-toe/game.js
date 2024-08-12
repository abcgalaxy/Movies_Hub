let msg=document.querySelector("h2");
let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let x=true;
let count=0;

//div element to show when game ends
let msg_container= document.createElement("div");
msg_container.className="endgame";

//restart button
let rst=document.createElement("button");
rst.innerText="Restart";
rst.className="reset";

//winning patterns
let patterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//function for checking of winner
function winner(){
    for(let p of patterns){
        let x=boxes[p[0]].innerText;
        let y=boxes[p[1]].innerText;
        let z=boxes[p[2]].innerText;
        if(x!="" && x==y && y==z && x==z){
            return true;
        }
    }
    return false;
}

function disableBoxes(){
    for(box of boxes){
        box.disabled=true;
    }
}

function enableBoxes(){
    for(box of boxes){
        box.disabled=false;
    }
}

//function for endgame
function endgame(){
    let winner1;
    if(x) winner1="X";
    else winner1="O";
    msg_container.innerText=`The Winner is ${winner1}`;
    let position=document.querySelector(".main_container");
    position.before(msg_container);
    msg_container.append(rst);
    disableBoxes();
    reset.disabled=true;
}

function draw(){
    msg_container.innerText="DRAW";
    let position=document.querySelector(".main_container");
    position.before(msg_container);
    msg_container.append(rst);
    disableBoxes();
    reset.disabled=true;
}
//function for clicking
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.dir(box);
        if(x) box.innerText="X";
        else box.innerText="O";
        count++;
        box.disabled=true;
        if(winner()) endgame();
        else if(count==9){
            draw();
        }
        x=!x;
    })
});


reset.addEventListener("click",reset_func=()=>{
    enableBoxes();
    for(box of boxes){
        box.innerText="";
    }
    count=0;
    x=true;
});

rst.addEventListener("click",()=>{
    reset_func();
    msg_container.remove();
    rst.remove();
});