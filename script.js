//console.log('Wramble Frenzy') //smoke test
// console.log(allDecks[0].children[0].innerText)

//---------------------------CACHING all req'd elements-----------------------------------------

import {topics} from './wordList.js'; //importing data to get the word list

const startPage = document.querySelector('.start-page'); //console.log(startPage) // console.log(startPage.style)
const gamePage = document.querySelector('.game-container');
const allDecks = document.getElementsByClassName('deck');  //console.log(allDecks) --> [topic1, topic2,...]
const gameTopicHeader = document.querySelector('h2'); // console.log(gameTopicHeader)
const displayedWord = document.querySelector('.word');//console.log(displayedWord)
const showHintBtn = document.querySelector('.show-hint-btn'); //console.log(showHintBtn)
const hint = document.querySelector('.hint-text');
const input = document.querySelector('input');

let correctWord = ''; //initialize in global scope

//buttons on gamePage
const returnToStartBtn = document.querySelector('.return-start-btn');
const swapBtn = document.querySelector('.swap-word');
const nextBtn = document.querySelector('.submit-word');

//---------------------------------FUNCTIONS----------------------------------------------------
function goStartPage(){
    gamePage.style.display = 'none';
    startPage.style.display = 'block';
}

function jumbleLetters(word) {
    //convert the word to an array with all letters
    let letters = word.split('');
    //using a shuffle algorithm (see references), to iterate through each lettter and randomly swap them around only once
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join(''); //join the jumbled letters into one word --> to be displayed w/o commas
}

function goGamePage(event){
    // console.log(event);
    const deckIndex = Array.from(allDecks).indexOf(event.currentTarget); //currentTarget will target parent always
    startPage.style.display = 'none';
    gamePage.style.display = 'flex';
    gameTopicHeader.innerText = allDecks[deckIndex].children[0].innerText; //display apt topic

    let wordsArray = []; //initialize array
    let jumbledWord = ''; //initialize string
    topics.forEach(topic => {
        if (topic.topicName === allDecks[deckIndex].children[0].innerText) { 
        wordsArray = Object.keys(topic.wordsAndHints); //chache all words from chosen topic into an array
        let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)] //pick a random word from list //console.log(randomWord)
        jumbledWord = jumbleLetters(randomWord); //use function to jumble letters
        displayedWord.innerText = jumbledWord; //display jumbled word //console.log(jumbledWord)
    
        hint.innerText = topic.wordsAndHints[randomWord] //display associated hint

        correctWord = randomWord;  //console.log('CORRECT: ' + correctWord)
        } 
    });
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

//swap button
// swapBtn.addEventListener('click')

//next button


//workings-----------------------------------------------------------------------------------

//event listener for single specified deck:// allDecks[0].addEventListener('click', goGamePage)

// console.log(topics) // console.log(topics[0].topic) //testing link to wordList.js

// matching deck topic to topic from wordList // console.log(allDecks[0].children[0].innerText === topics[0].topic) //true

// const deckIndex = 0;
// const clickedTopicText = allDecks[deckIndex].children[0].innerText;
// console.log(clickedTopicText)

// topics.forEach(topic => {
//     if (topic.topicName === allDecks[deckIndex].children[0].innerText) { 
//         console.log(Object.keys(topic.wordsAndHints)); //returns []
//     } 
// });

// let wordsArray = []
// wordsArray = Object.keys(topics[1].wordsAndHints)
// let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]
// let letters = randomWord.split('');
// console.log(letters) //--> [] of single letters

// console.log(Object.values(topics[1].wordsAndHints)) //--> array of hints

// console.log(randomWord + ': ' + topics[1].wordsAndHints[randomWord]) //get hint associated with the displayed random word


const getInput = () => {
    let playerInput = input.value.toLocaleLowerCase();//obtaining player input //console.log(playerInput);

    if (playerInput === '') {
        input.placeholder = 'type to click next';
        input.style.border = '2px solid #ff006c';
    } elseif (playerInput === correctWord) {
        
    } elseif () {

    }
}
nextBtn.addEventListener('click', getInput);

//click next --> check word 
        // cannot be blank --> "type in your answer to click next"
        //if correct --> add to score and next word
        //if wrong --> x point and next word 

//click swap --> to try another word and return to it later OR skip word means no point
