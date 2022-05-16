const secretPhrases = ["cow", "panter", "wolf", "sheep", "chicken", "dog", "goat", "camel", "bear", "parrot"];
const aToZ = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let randomPhrase = "";
let clicked = [];
let Underscored = "";
let misstakes = 0;
let gameOver = 0;

function selectRandomItem () {
    randomPhrase = secretPhrases[Math.floor(Math.random()*secretPhrases.length)];
    console.log(randomPhrase);
    const buttons = document.querySelectorAll(".letter");
    buttons.forEach(function (button) {
        button.addEventListener("click", buttonHandler);
    });
    window.addEventListener("keydown", keyHandler);
};
function buttonHandler(key) {
    letterHandler(key.target.id);
};
function keyHandler(event) {
    if (aToZ.indexOf(event.key) >= 0) {
        letterHandler(event.key);
    };
};
function letterHandler(letter) {
    if (gameOver === 0) {
        letter = letter.toLowerCase();
        if (clicked.indexOf(letter) === -1) {
            clicked.push(letter);
        };
        if (document.getElementById(`${letter.toUpperCase()}`).className !== "used") {
            if (randomPhrase.indexOf(letter) >= 0) {
                setUnderScores();
                checkIfWon();
            }else {
                wrongGuess();
            };
        }
        document.getElementById(letter.toUpperCase()).className = "used";
    };
};
function setUnderScores() {
    let splittedPhrase = randomPhrase.split("");
    let mappedPhrase = splittedPhrase.map((letter) =>{
        if (clicked.indexOf(letter) >= 0) {
            return letter;
        } else {
            return "_";
        };
    });
    Underscored = mappedPhrase.join("").toUpperCase();
    document.querySelector(".underScores").innerText = Underscored;
};
function checkIfWon() {
    if (randomPhrase === Underscored.toLowerCase()) {
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("gameOver").innerText = "You Won!!";
        document.getElementById("hangmanImg").src = "./assets/winner.png";
        document.getElementById("resetGame").style.visibility = "visible";
        gameOver = 1;
    };
};
function wrongGuess() {
    misstakes++;
    if (misstakes <= 6) {
        document.getElementById("hangmanImg").src = `./assets/hangman${misstakes}.png`;
    };
    if (misstakes === 6) {
        document.getElementById("hangmanImg").src = "./assets/hangman6.png";
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("gameOver").innerText = `You lost!! the word was ${randomPhrase}.`;
        document.getElementById("resetGame").style.visibility = "visible";
        gameOver = 1;
    };
};
document.getElementById("resetGame").addEventListener("click", () => location.reload());

selectRandomItem();
setUnderScores();