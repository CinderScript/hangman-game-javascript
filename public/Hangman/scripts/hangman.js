let theChosenWord = "unselected"
let gameWindow;
let wordProgress;
let manProgress;
let categoriesDropdown;
let gallowsDisplay;

// INITIALIZATION - GET ELEMENTS, SET HANDLERS, POPULATE DROP DOWN
document.addEventListener("DOMContentLoaded", () => {

    //settup button handlers
    document.getElementById("play-btn").onclick = Play;
    document.getElementById("guess-letter-btn").onclick = GuessLetter;
    document.getElementById("guess-word-btn").onclick = GuessWord;

    // get page elements
    gameWindow = document.getElementById("game-window");
    wordProgress = document.getElementById("word-progress");
    manProgress = document.getElementById("man-progress");
    categoriesDropdown = document.getElementById("word-categories");
    gallowsDisplay = document.getElementById("gallows");

    // write each category name from the json object to the select element's options
    for (const wordGroup of wordBank){
        option = document.createElement("option");
        option.value = wordGroup.category;
        option.textContent = wordGroup.category;
        categoriesDropdown.appendChild(option);
    }

    // draw gallows
    gallowsDisplay.innerText = hangmanASCII;
});

function Play(){
    let possibleWords;
    // find words in the selected catagory
    for ( const wordGroup of wordBank )
        if ( wordGroup.category === categoriesDropdown.value)
            possibleWords = wordGroup.words;

    // select only the words with correct number of letters
    

    let length = possibleWords.length;
    let randomIndex = Math.floor(Math.random() * length)
    theChosenWord = possibleWords[randomIndex];
}

function GuessLetter(){
    SetProgress( wordProgress, 80);
    SetProgress( manProgress, 20);
}

function GuessWord(){
    SetProgress( wordProgress, 80);
    SetProgress( manProgress, 20);
}

// sets the given progress bar to the correct value
async function SetProgress(bar, value){

    // temporarily animate the bar
    bar.classList.add("progress-bar-animated");

    // flash the progress bar
    let flashCount = 6;
    let interval = 120;
    for (let i = 0; i < flashCount; i++){
        if (bar.classList.contains("d-none"))
            bar.classList.remove("d-none");
        else
            bar.classList.add("d-none");

        await Sleep(interval);
    }

    // set the bar's new value
    bar.style.width = value+"%";
    bar.setAttribute("aria-valuenow", value);
    bar.innerText = value+"%";

    // stop the animation after a pause
    await Sleep(3000);
    bar.classList.remove("progress-bar-animated");
}

// used for easier to read waiting intervals/timeouts (async style code)
function Sleep(ms) {
    return new Promise( callback => setTimeout(callback, ms));
}


let wordBank =
    [
        {"category": "Animal", "words": ["dog", "cat", "mouse", "rabbit", "horse", "anaconda", "ox", "tardigrade", "turtle", "bear"]},
        {"category": "Fruit", "words": ["apple", "pear", "fig", "grape", "watermelon", "strawberry", "persimmon", "cherimoya", "plumb", "avacado"]},
        {"category": "State Of Mind", "words": ["fearful", "happy", "sad", "mad", "indecisive", "content", "agitated", "confused", "twitterpated", "convinced", "terrified"]}
    ];


let hangmanASCII = "" +
    "        ===§===\\\\==tt==\n" +
    "           §    \\  ||\n" +
    "           §     \\ ||\n" +
    "           šO     \\||\n" +
    "          /|\\      ||\n" +
    "           |       ||\n" +
    "         _/ \\_     ||\n" +
    "========      //===TT=========\n" +
    "  \\||/        /         \\||/\n" +
    "   ||        /           ||\n" +
    "   ||                    ||\n" +
    "  /||\\                  /||\\\n" +
    "==####=^^======^====^^^=####===";
