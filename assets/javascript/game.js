var userChoice = ["a", "b", "c", "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m", "n", "o", "p", "q",
    "r", "s", "t", "u", "v", "w", "x", "y", "z"]

var wins = 0
var g = 13
var guessesRemaining = g                //set guesses remaining to g to more easily reset upon conditions
var correctLetters = [];
var lettersGuessed = [];
var wrongLetters = [];
var song = ["Big Girls Dont Cry", "Working My Way Back To You", "My Eyes Adored You", "Walk Like A Man", "A Sunday Kind of Love", ""]
var chosenSong;
var w = 0;
var spaces = 0;
//variable that tracks where I am in the song array
function clear() {                                                  //computer starts with first song, and when guesses run out or user is correct, moves to next 
    guessesRemaining = g
    document.getElementById("dashedLetters").innerText = " ";
    lettersGuessed = [];
    wrongLetters = [];
    spaces = 0;
    return guessesRemaining, dashedLetters, lettersGuessed, wrongLetters, spaces;
}
function nextSong() {

    console.log(w);
    chosenSong = song[w];
    chosenSong = chosenSong.toLowerCase();
    console.log(chosenSong);
    w++;
    console.log(w);
    for (d = 0; d < chosenSong.length; d++) {
        console.log(d)
        if (chosenSong[d] === " ") {
            document.getElementById("dashedLetters").innerText += "-";
            spaces++;
        }
        else {
            document.getElementById("dashedLetters").innerText += " _ ";
        }
    }
    return w, chosenSong, spaces;
};

function updateBoard() {
    document.getElementById("wins").innerText = wins;
    document.getElementById("guessesRemaining").innerText = guessesRemaining;
    document.getElementById("wrongLetters").innerText = wrongLetters;
}




updateBoard();
clear();
nextSong();




document.onkeyup = function (event) {
    var userGuess = event.key;                                      //going to check if letter has been guessed before, duplicate initially set to false- if already used, will change to true
    var isDuplicate = false;                                        // and prevent rest of code from happening
    for (i = 0; i < lettersGuessed.length; i++) {
        if (userGuess === lettersGuessed[i]) {
            var isDuplicate = true;
            alert("You already tried that letter!");
            break;
        }
    };

    if (!isDuplicate) {
        if (userChoice.indexOf(userGuess) !== -1) {                 //verifies userGuess is a valid option

            for (c = 0; c < chosenSong.length; c++) {               //loop the chosenSong to verify if userGuess input matches any letter
                if (userGuess === chosenSong[c]) {
                    lettersGuessed.push(userGuess);
                    correctLetters = userGuess + correctLetters;
                    dashedLetters[c] = userGuess;                   //correctLetters is an array that will receive correct letters, need to figure out how to
                    console.log(correctLetters);                    //replace the dashes with the correct letter, in the correct order
                }
            }

            if (chosenSong.indexOf(userGuess) === -1) {             //if letter is not in string, add to guessed letters and reduce guesses remaining
                lettersGuessed.push(userGuess);
                wrongLetters = userGuess + wrongLetters;
                guessesRemaining--;
            }
        }
        else {
            alert("You must select a letter of the alphabet to play!")
        }
        if ((correctLetters.length + spaces) === chosenSong.length) {
            wins++;
            alert("The answer is:" + chosenSong);
            clear();
            nextSong();
        }
        if (guessesRemaining === 0) {
            alert("Out of guesses! The correct answer was:" + chosenSong);
            clear();
            nextSong();
        }
        updateBoard();
    }
    if (wins === 5) {
        alert("Well done! You guessed them all!")
    }
};

