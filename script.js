const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector("#game-info");
const newGameBtn = document.querySelector(".btn")



// initial condition
let currentPlayer;
let gameGrid;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame() {
    console.log("init function")
    currentPlayer = "X";
    //game grid is working internally
    gameGrid = ["","","","","","","","",""];
    
    boxes.forEach((box,index) =>{
       //all boes works externally on UI
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;

    })
     newGameBtn.classList.remove("active");
     gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function checkGameOver(){
    console.log("check game fire here")
    let answer="";

winningPositions.forEach((position) =>{
    if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")
    && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]]))
    {
        if(gameGrid[position[0]]=="X")
        answer="X";
    
    else{
        answer= "O";
    }

    boxes.forEach((box) =>{
        box.style.pointerEvents = "none";
    })
    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");
}
})


if(answer!==""){
    console.log(answer);
    gameInfo.innerText = `winner Player - ${answer}`
    newGameBtn.classList.add("active")
    return
}

let fillCount=0;
gameGrid.forEach((box) =>{
    console.log(box)
    if(box!==""){
        fillCount++;
        console.log(` fill count ${fillCount}`)
    }
})

if(fillCount===9){
    console.log(fillCount)
    gameInfo.innerText = "Game Tied !"
    newGameBtn.classList.add("active")
}

}

function swapTurn(){
    console.log("swap turn function called");
    if(currentPlayer==="X"){
        currentPlayer="0";
        console.log("0 turn");
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }
    else{
        currentPlayer="X";
        console.log("x turn");
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"
        swapTurn();
        checkGameOver();
    }
}
boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        return handleClick(index);
    })
}); 

newGameBtn.addEventListener("click",()=>{
    initGame()
})