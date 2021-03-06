var alphabet;
var selectedWord;
var selectedHint;
var board;
var remainingGuesses;
var words;

// VARIABLES
function initVar() {
    // Creating an array of available letters
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    selectedWord = "";
    selectedHint = "";
    board = [];
    remainingGuesses = 6;
    words = [{word: "snake", hint: "It's a reptile"},
            {word: "monkey", hint: "It's a mammal"},
            {word: "beetle", hint: "It's an insect"}];
}

// LISTENERS
window.onload = startGame();

function buttons() {
    $(".letter").click(function() {
        checkLetter($(this).attr("id"));
        disableButton($(this));
    });
    
    $(".replayBtn").on("click", function() {
        //location.reload();
        startGame();
    });
    
    // Reveal the hint and subtract a guess.
    $("#hintBtn").on("click", function() {
        $(this).hide();
        $("#hint").replaceWith('<div id="hint"><h4>' + selectedHint + '</h4></div>');
        $("#hint").show();
        checkLetter("");
    });
}

// FUNCTIONS
function startGame() {
    $("#won").hide();
    $('#lost').hide();
    $("#hint").empty();
    $("#hintBtn").replaceWith('<button id="hintBtn" class="btn">Hint</button>');
    $('#hintBtn').show();
    $('#hintBtn').prop("disabled", false);
    $('#hintBtn').attr("class", "btn");
    initVar();
    pickWord();
    initBoard();
    updateMan();
    updateBoard();
    createLetters();
    buttons();
}

// Fill the board with underscores
function initBoard() {
    for (var letter in selectedWord) {
        board.push("_");
    }
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

function updateBoard() {
    $("#word").empty();
    
    for (var i = 0; i < board.length; i++) {
        $("#word").append(board[i] + " ");
    }
    
    $("#word").append("<br />");
}

// Creates the letters inside the letters div
function createLetters() {
    $("#letters").empty();
    for (var letter of alphabet) {
        $("#letters").append("<button class='letter btn btn-success' id='" + letter + "'>" + letter + "</button>");
    }
    $("#letters").show();
}

// Checks to see if the selected letter exists in the selectedWord
function checkLetter(letter) {
    var positions = new Array();
    // Put all the positions the letter exists in an array
    for (var i = 0; i < selectedWord.length; i++) {
        if (letter == selectedWord[i]) {
            positions.push(i);
        }
    }
    
    if (positions.length > 0) {
        updateWord(positions, letter);
        
        // Check to see if this is a winning guess
        if (!board.includes('_')) {
            endGame(true);
        }
    } else {
        remainingGuesses -= 1;
        updateMan();
    }
    
    if (remainingGuesses <= 0) {
        endGame(false);
    }
}

// Update the current word then calls for a board update
function updateWord(positions, letter) {
    for (var pos of positions) {
        board[pos] = letter;
    }
    
    updateBoard();
}

function updateMan() {
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

// Ends the game by hiding game divs and displaying the win or loss divs
function endGame(win) {
    $("#letters").hide();
    disableButton($("#hintBtn"));
    
    if (win) {
        $('#won').show();
        $('#guessed').append(" " + selectedWord);
        $('#guessed').show();
    } else {
        $('#lost').show();
    }
}

// Disasbles the button and changes the style to tell the user it's disabled
function disableButton(btn) {
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger");
}