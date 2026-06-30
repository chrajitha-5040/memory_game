const emojis = [
    "🍎","🍌","🍇","🍓",
    "🍎","🍌","🍇","🍓",
    "🐶","🐱","🐼","🦁",
    "🐶","🐱","🐼","🦁"
];

let board = document.getElementById("board");
let movesText = document.getElementById("moves");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
}

function createBoard(){

    board.innerHTML="";
    shuffle(emojis);

    emojis.forEach(emoji=>{

        let card=document.createElement("div");

        card.classList.add("card");
        card.dataset.value=emoji;
        card.innerHTML="?";

        card.addEventListener("click",flipCard);

        board.appendChild(card);

    });

}

function flipCard(){

    if(lockBoard) return;

    if(this===firstCard) return;

    if(this.classList.contains("matched")) return;

    this.innerHTML=this.dataset.value;
    this.classList.add("flipped");

    if(!firstCard){

        firstCard=this;
        return;

    }

    secondCard=this;

    moves++;
    movesText.innerHTML=moves;

    checkMatch();

}

function checkMatch(){

    if(firstCard.dataset.value===secondCard.dataset.value){

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        resetCards();

        checkWin();

    }else{

        lockBoard=true;

        setTimeout(()=>{

            firstCard.innerHTML="?";
            secondCard.innerHTML="?";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetCards();

        },800);

    }

}

function resetCards(){

    firstCard=null;
    secondCard=null;
    lockBoard=false;

}

function checkWin(){

    let matched=document.querySelectorAll(".matched");

    if(matched.length===16){

        setTimeout(()=>{
            alert("Congratulations! You won in "+moves+" moves.");
        },300);

    }

}

function restartGame(){

    moves=0;
    movesText.innerHTML=0;
    firstCard=null;
    secondCard=null;
    lockBoard=false;

    createBoard();

}

createBoard();