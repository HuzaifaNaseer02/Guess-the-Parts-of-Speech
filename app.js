var wordList;
var posList;
var posOptions;
var currentWord;

wordList = getColumn("Words", "Word");
posList = getColumn("Words", "Part of Speech");
posOptions = ["verb", "noun", "pronoun", "number", "infinitive marker", "conjunction", "preposition", "determiner", "adjective", "adverb", "existential there", "__"];

var textBox = "displayWord";
var posDropdown = "chooseAnswer";


displayWord();

setProperty(posDropdown, "options", posOptions);


function displayWord() {
    var index = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[index];
    setText(textBox, currentWord);
}

function checkAnswer(selectedPos) {
    var correctPos = "";
    var index = wordList.indexOf(currentWord);

    if (index !== -1) {
        correctPos = posList[index];
    }

    if (selectedPos == correctPos) {
        setScreen("screen2");
    } else {
        setScreen("screen3");
        setText("correctAnswer", "The correct answer is " + correctPos + "!");
    }
}

function startOver() {
    setScreen("mainScreen");
    displayWord();
}

onEvent("giveWord", "click", function () {
    displayWord();
});

onEvent("checkAnswer", "click", function () {
    var selectedPos = getText(posDropdown);
    checkAnswer(selectedPos);

    onEvent("startScreen", "click", function () {
        startOver();
    });

    onEvent("tryAgain", "click", function () {
        startOver();
    });
});
