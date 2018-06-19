var userChoice = ["a", "b", "c", "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m", "n", "o", "p", "q",
    "r", "s", "t", "u", "v", "w", "x", "y", "z"]

var wins = 0
var g = 13
var guessesRemaining = g                                                //set guesses remaining to g to more easily reset upon conditions
var correctLetters = [];
var lettersGuessed = [];
var wrongLetters = [];
var song = ["Big Girls Dont Cry", "Working My Way Back To You", "My Eyes Adored You", "Walk Like A Man", "A Sunday Kind of Love", ""]
var chosenSong;
var w = 0;


function clear() {                                                      //clear function to reset after running out of guesses or being correct
    guessesRemaining = g
    correctLetters = [];
    lettersGuessed = [];
    wrongLetters = [];
    return guessesRemaining, correctLetters, lettersGuessed, wrongLetters;
}
function nextSong() {                                               //tracks W to always give the next song in array (can easily change to random)
    chosenSong = song[w];                                               //also creates dashes in place of letters of the chosenSong
    chosenSong = chosenSong.toLowerCase();
    w++;
    for (d = 0; d < chosenSong.length; d++) {
        if (chosenSong[d] === " ") {
            correctLetters.push(chosenSong[d]);
        }
        else {
            correctLetters.push("_");
        }
    }
    return w, chosenSong,correctLetters;
};

function updateBoard() {                                          //keeps track of wins, could have alternatively done a "return wins;" but practicing function calling
    document.getElementById("wins").innerText = wins;
    document.getElementById("correctLetters").innerText = correctLetters.join(" ");
    document.getElementById("guessesRemaining").innerText = guessesRemaining;
    document.getElementById("wrongLetters").innerText = wrongLetters;
}

function next(){ 
    clear();
    nextSong();
    updateBoard();  

}

clear();                                                         //calls initial functions to prepare the game
nextSong();
updateBoard(); 




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
                    correctLetters.splice(c, 1,  userGuess);
                }
            }

            if (chosenSong.indexOf(userGuess) === -1) {             //if letter is not in string, add to guessed letters and reduce guesses remaining
                lettersGuessed.push(userGuess);
                wrongLetters = userGuess + wrongLetters;
                guessesRemaining--;
            }
        }
        else {                                                      //notifies player if select non-alphabet option
            alert("You must select a letter of the alphabet to play!")
        }
        if (correctLetters.indexOf("_") === -1) {               //checks if all correct letters have been found +  no _ remain
            wins++;
            chosenSong = chosenSong.toUpperCase();
            document.getElementById("answer").innerHTML ="The answer is: <br><br><br>"  + "<p style='font-size: 48px;'>" + chosenSong + "</p>";                                               // want to change to a button that user clicks to move to next song

        }
        if (guessesRemaining === 0) {                                   //when guesses = 0, alerts user and gives answer, resets game for next song
            alert("Out of guesses! The correct answer was:" + chosenSong);

        }
        updateBoard();
    }
    if (wins === 5) {
        alert("Well done! You guessed them all!")
    }

};
