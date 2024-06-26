import {topics} from './wordList.js'; //importing data to get the word list

//---------------------------GLOBAL VARIABLES----------------------------------------------------

//----------------------------------------state variables----------------------------------------
let deckIndex = -1; //initialize initial state i.e. no deck selected until deck is clicked and goGamePage called
let correctWord = ''; //initialize empty str
let wordsArray = []; //initialize array to store words from selected topic
let usedWords = []; //initialize array to store and track used words (i.e. already randomly generated once)
let remainingWords = []; //initialize array to store and track UNused words

let score = 0; //initialize num value

//---------------------------caching all req'd elements-----------------------------------------

const startPage = document.querySelector('.start-page'); 
const gamePage = document.querySelector('.game-container');
const allDecks = document.getElementsByClassName('deck'); 
const gameTopicHeader = document.querySelector('h2'); 
const displayedWord = document.querySelector('.word');
const hint = document.querySelector('.hint-text');
const input = document.querySelector('input');
const currentQn = document.querySelector('.current-qn');
const totalQn = document.querySelector('.total-qn');
const results = document.querySelector('.results');
const resultText = document.querySelector('.result-text');

//buttons on gamePage
const returnToStartBtn = document.querySelector('.return-start-btn');
const showHintBtn = document.querySelector('.show-hint-btn');
const nextBtn = document.querySelector('.submit-word');

//---------------------------------FUNCTIONS----------------------------------------------------
function getRandomUnusedWord() {
    //filter out used words (which are stored in the usedWords array)
    remainingWords = wordsArray.filter(word => !usedWords.includes(word)); //modify global!
        if (remainingWords.length === 0) {
            showResults(); // console.log('All words used.')
            return '';
        }
    let randomWord; //assigned outside do..while to access outside the loop (see lines52-55)
        do { //initial state
            randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]; //pick a random word from list //console.log(randomWord)
            currentQn.innerText = 1; //initial current qn no 
            totalQn.innerText = wordsArray.length; //initial total qn no
                    
        } while (usedWords.includes(randomWord));

    usedWords.push(randomWord); //randomly picked word => used
    remainingWords = remainingWords.filter(word => word !== randomWord); //remove the used word from remainingWords
    updateQnNo(); //qn no tracker
    return randomWord; // the unused random word to be used in goGamePage fn
}

function jumbleLetters(word) {
    //convert the word to an array with all letters
    let letters = word.split('');
    //using a shuffle algorithm (see references), to iterate through each lettter and randomly swap them around
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join(''); //join the jumbled letters into one word --> to be displayed w/o commas
}

function tackleSelectedTopic(selectedTopic) {
    if (selectedTopic) {
        wordsArray = Object.keys(selectedTopic.wordsAndHints); //chache all words from chosen topic into an array
        let currentRandomWord = getRandomUnusedWord(); //get random unused word and track used words
        let jumbledWord = jumbleLetters(currentRandomWord); //use function to jumble letters
        displayedWord.innerText = jumbledWord; //display jumbled word //console.log(jumbledWord)
        hint.innerText = selectedTopic.wordsAndHints[currentRandomWord] //display associated hint
        return correctWord = currentRandomWord;  //to reassign global var //console.log('CORRECT: ' + correctWord)
    }
}

function goGamePage(event){
    deckIndex = Array.from(allDecks).indexOf(event.currentTarget); //currentTarget will target parent always
    startPage.style.display = 'none';
    gamePage.style.display = 'flex';
    gameTopicHeader.innerText = allDecks[deckIndex].children[0].innerText; //display apt topic

    const selectedTopic = topics.find(topic => topic.topicName === allDecks[deckIndex].children[0].innerText);
    tackleSelectedTopic(selectedTopic);
       
    updateQnNo();
}

function goStartPage(){
    gamePage.style.display = 'none';
    startPage.style.display = 'block';
    hideResults();
    // Reset used and remaining words array and score!
    remainingWords = [];
    usedWords = [];
    score = 0;
    // console.log('go start ', remainingWords.length)
}

function checkInput() {
    //correct or wrong --> move on to next --> try all words once

    let playerInput = input.value.toLocaleLowerCase();//obtaining player input //console.log(playerInput);

    if (playerInput === '') {
        input.placeholder = 'do not leave it blank';
        input.style.border = '2px solid #ff006c';
        input.classList.add('shake-animation');
        input.addEventListener('animationend', removeShakeClass);  //to remove shake-animation class after animation ends
    
    } else if (playerInput === correctWord) {
        score++; //+1 for correct answer // console.log('answer correct' + 'score: ' + score)
        nextQn();
    
    } else {
        nextQn() //player got it wrong --> no point added 
    }

}

function showResults() {
    results.style.visibility = 'visible';
    displayedWord.style.visibility = 'hidden';
    input.style.visibility = 'hidden';
    showHintBtn.style.visibility = 'hidden';
    nextBtn.style.visibility = 'hidden';

    if (score > (wordsArray.length/2)) {
        resultText.innerText = 'Congrats! You got ' + score + ' words right!';
    } else {
        resultText.innerText = 'Oh snap! You only got ' + score +  ' right!';
    }
}

function hideResults() {
    results.style.visibility = 'hidden';
    displayedWord.style.visibility = 'visible';
    input.style.visibility = 'visible';
    showHintBtn.style.visibility = 'visible';
    nextBtn.style.visibility = 'visible';
}

function nextQn() {
    input.value = ''; //clear input field
    input.placeholder = 'type your answer here';
    input.style.border = 'none';
    correctWord = getRandomUnusedWord(); //generate next word
    displayedWord.innerText = jumbleLetters(correctWord); //display jumbled word 
    hint.innerText = topics[deckIndex].wordsAndHints[correctWord]; //get associated hint
    hint.style.display = 'none'; //initially hint not displayed until clicked
    updateQnNo();
}

function updateQnNo() {
    currentQn.innerText = usedWords.length;
    totalQn.innerText = remainingWords.length + usedWords.length;
}

//to remove shake-animation class from input
function removeShakeClass() {
    input.classList.remove('shake-animation');
    input.removeEventListener('animationend', removeShakeClass); // remove the event listener after executing once
}

//-----------------------------EVENT LISTENERS------------------------------------------------------

//click any of the deck --> game page
Array.from(allDecks).forEach((deck) => {
    deck.addEventListener('click', goGamePage)
});

//try another deck-->returns to start page
returnToStartBtn.addEventListener('click', goStartPage)

//show hint button
showHintBtn.addEventListener('click', () => {
    hint.style.display = 'inline'
})

//input field --> get focus
input.addEventListener('click', focus())

//next button
nextBtn.addEventListener('click', checkInput);
