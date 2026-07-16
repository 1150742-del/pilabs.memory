let round = 1;
let playerIndex = 0;
let acceptingInput = false;

const status = document.getElementById("status");
const keys = document.querySelectorAll(".key");
const startButton = document.getElementById("start");

startButton.addEventListener("click", startGame);


// Start / restart game
function startGame(){

    round = 1;
    playerIndex = 0;

    startButton.disabled = true;

    showSequence();

}


// Flash a key visually
function flashButton(value){

    const button = document.querySelector(
        `[data-value="${value}"]`
    );

    if(!button) return;


    button.classList.add("active");


    setTimeout(()=>{

        button.classList.remove("active");

    },700);

}


// Show Simon sequence
function showSequence(){

    acceptingInput = false;

    let i = 0;


    const interval = setInterval(()=>{


        flashButton(PI[i]);


        i++;


        if(i >= round){


            clearInterval(interval);

            playerIndex = 0;

            acceptingInput = true;

        }


    },800);

}

keys.forEach(key=>{


    key.addEventListener("click",()=>{


        if(!acceptingInput)
            return;


        playerClicked(key.dataset.value);


    });


});


function playerClicked(value){


    if(value === PI[playerIndex]){


        playerIndex++;


        if(playerIndex === round){


            round++;

            acceptingInput = false;


            setTimeout(showSequence,1000);


        }


    }else{


        gameOver();


    }


}



// Game over screen
function gameOver(){


    acceptingInput = false;


    const finalNumber = PI
    .toString()
    .slice(0, round);


    const overlay = document.createElement("div");


    overlay.className = "game-over";



    overlay.innerHTML = `


        <div class="game-over-box">


            <h1>GAME OVER</h1>


            <p>Reached Round ${round}</p>


            <p>Final Number:</p>


            <div id="final-number">

                ${finalNumber}

            </div>


            <button id="restart">

                Restart

            </button>


        </div>


    `;



    document.body.appendChild(overlay);



    document
    .getElementById("restart")
    .addEventListener("click",()=>{


        overlay.remove();


        startButton.disabled = false;


        startGame();


    });



}