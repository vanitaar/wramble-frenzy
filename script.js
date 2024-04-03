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
const currentQn = document.querySelector('.current-qn');
const totalQn = document.querySelector('.total-qn');
const results = document.querySelector('.results')

//buttons on gamePage
const returnToStartBtn = document.querySelector('.return-start-btn');
// const swapBtn = document.querySelector('.swap-word');
const nextBtn = document.querySelector('.submit-word');

//global variables
let deckIndex = -1; //initialize initial state i.e. no deck selected until deck is clicked and goGamePage called
let correctWord = ''; //initialize empty str

let wordsArray = []; //initialize array to store words from selected topic
let usedWords = []; //initialize array to store and track used words (i.e. already randomly generated once)
let usedIndex = [];
let remainingWords = []; //initialize array to store and track UNused words

let score = 0; //initialize num value

//---------------------------------FUNCTIONS----------------------------------------------------
function getRandomUnusedWord() {
    //filter out used words (which are stored in the usedWords array)
    remainingWords = wordsArray.filter(word => !usedWords.includes(word)); //modify global!
    if (remainingWords.length === 0) {
        results.style.visibility = 'visible';
    }

    let randomIndex;
    let randomWord;
    
    do {
        randomIndex = Math.floor(Math.random() * wordsArray.length)
        randomWord = wordsArray[randomIndex]; //pick a random word from list //console.log(randomWord)
                   
    } while (usedWords.includes(randomWord));

    usedIndex.push(randomIndex); // index of the randomly picked word => used
    usedWords.push(randomWord); //randomly picked word => used
    remainingWords = remainingWords.filter(word => word !== randomWord); //remove the used word from remainingWords

    return randomWord // the unused random word to be used in goGamePage fn
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

function goGamePage(event){
    // console.log(event);
    deckIndex = Array.from(allDecks).indexOf(event.currentTarget); //currentTarget will target parent always
    startPage.style.display = 'none';
    gamePage.style.display = 'flex';
    gameTopicHeader.innerText = allDecks[deckIndex].children[0].innerText; //display apt topic

    let jumbledWord = ''; //initialize string locally

    topics.forEach(topic => {
        if (topic.topicName === allDecks[deckIndex].children[0].innerText) { 
        wordsArray = Object.keys(topic.wordsAndHints); //chache all words from chosen topic into an array
        let currentRandomWord = getRandomUnusedWord(); //get random unused word and track used words

        jumbledWord = jumbleLetters(currentRandomWord); //use function to jumble letters
        displayedWord.innerText = jumbledWord; //display jumbled word //console.log(jumbledWord)
        hint.innerText = topic.wordsAndHints[currentRandomWord] //display associated hint
        return correctWord = currentRandomWord;  //console.log('CORRECT: ' + correctWord)
        } 
    });
}

function goStartPage(){
    gamePage.style.display = 'none';
    startPage.style.display = 'block';
    // Reset used and remaining words array and score!
    usedIndex = [];
    remainingWords = wordsArray;
    score = 0;
}

const getInput = () => {
    //correct or wrong --> move on to next --> try all words once

    let playerInput = input.value.toLocaleLowerCase();//obtaining player input //console.log(playerInput);

    if (playerInput === '') {
        input.placeholder = 'do not leave it blank';
        input.style.border = '2px solid #ff006c';
    } else if (playerInput === correctWord) {
        score++; //+1 for correct answer // console.log('answer correct' + 'score: ' + score)

    } //player got it wrong --> no point added 
    
    input.value = ''; //clear input field
    correctWord = getRandomUnusedWord(); //generate next word
    displayedWord.innerText = jumbleLetters(correctWord); //display jumbled word 
    hint.innerText = topics[deckIndex].wordsAndHints[correctWord] //get associated hint
    hint.style.display = 'none'; //initially hint not displayed until clicked
    currentQn.innerText = usedWords.length;
    totalQn.innerText = remainingWords.length+usedWords.length;

    console.log('Used Words:', usedWords, 'Remaining Words:', remainingWords);
    console.log(usedWords.length);
    console.log(remainingWords.length+usedWords.length) 
    console.log('score: ' + score)
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
nextBtn.addEventListener('click', getInput);

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

//click next --> check word 
        // cannot be blank --> "type in your answer to click next"
        //if correct --> add to score and next word
        //if wrong --> x point and next word 

//!!! important each word appear once --> i.e. need to keep track of unused/used words

//click swap --> to try another word and return to it later OR skip word means no point

///sudden thought what if jumbled letters end up being same as actual word?? --> need to add a check

    // const randomIndex = [Math.floor(Math.random() * words.length)]
    // const randomObj = words[randomIndex];

    // console.log('random obj: ', randomObj); //{correct: 'jumbled', hint: '....'}

    // words.forEach(word => {
    // let key = Object.keys(word)
    // let randomWord = Object.values(word)
    // return { correctAns: key[0], jumbled: randomWord[0], relHint: randomWord[1] };  //return an object literal with word and hint properties/keys
    // });
//-----------------------------------rehashing code---------------------------------------------------
// function getShuffledArray(deckIndex) {

//     let arrayShuffled = []; //initialize empty array locally

//     topics.forEach(topic => {
//         if (topic.topicName === allDecks[deckIndex].children[0].innerText) { //condition: clicked deck name = topic name from wordList
//         arrayShuffled = Object.keys(topic.wordsAndHints); //chache all words from chosen topic into an array --> to shuffle 
//         }
//     });   // console.log(arrayToShuffle); //array retrieved 

//    //using a shuffle algorithm (see references), to iterate through each word and randomly swap them around
//     for (let i = arrayShuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [arrayShuffled[i], arrayShuffled[j]] = [arrayShuffled[j], arrayShuffled[i]];
//     };

//     return arrayShuffled;
//     // wordsArray = Object.keys(topics[0].wordsAndHints);
//     // console.log(arrayToShuffle + ' original: ' + wordsArray); 
// }

// function getJumbledWords(array, relatedHintsObj) {
//     let jumbledWordWithHints = []; //initialize empty array locally --> cache jumbled word with their associated hints

//     while (jumbledWordWithHints.length !== array.length) { //keep pushing until get all the words in the array jumbled
//         array.forEach(word => {
    
//             let letters = word.split(''); //convert the word to an array with all letters
        
//             //using a shuffle algorithm (see references), to iterate through each lettter and randomly swap them around
//             for (let i = letters.length - 1; i > 0; i--) {
//                 const j = Math.floor(Math.random() * (i + 1));
//                 [letters[i], letters[j]] = [letters[j], letters[i]];
//             }

//             //using const because assigning only once thru each itearation within loop
//                 const jumbledWord = letters.join(''); //join the jumbled letters into one word --> to be displayed w/o commas 
//                 const hint = relatedHintsObj[word]

//                 jumbledWordWithHints.push({ [word]: jumbledWord, hint}); //creating obj and pushing into the array
//                // console.log(jumbledWordArray); //output: [0: {word: jumbledword, hint: '...'}, ]
//             });
//     }

//         return jumbledWordWithHints; //obj with keys: word and hint and their corresponding values
// }

// // console.log(getJumbledWords(Object.keys(topics[0].wordsAndHints), topics[0].wordsAndHints));

// function initateGamePage(event) {
//     deckIndex = Array.from(allDecks).indexOf(event.currentTarget); //specific topic //currentTarget will target parent always
//     //console.log(deckIndex);
//     return deckIndex; //to update global variable
// }

// function displayGamePage(deckIndex) {
//     startPage.style.display = 'none';
//     gamePage.style.display = 'flex';
//     gameTopicHeader.innerText = allDecks[deckIndex].children[0].innerText; //display apt topic
// }

// function getWordWithHint(wordHintObj) {
//     let words = [] ; //
//     words = Object.values(wordHintObj); //cache all words in an array

//     console.log('words: ', words)

//     for (const word of words) {
//         const key = Object.keys(word);
//         const randomWord = Object.values(word);
//         return { correctAns: key[0], jumbled: randomWord[0], relHint: randomWord[1] };
//     }

// }

// function displayWordHint(obj) {
// //obj = { correctAns: '', jumbled: '', relHint: '' };    
//     let values = Object.values(obj);

//     displayedWord.innerText = values[1];
//     hint.innerText = values[2]
// }



// function startGame(event) {
//     deckIndex = initateGamePage(event); //update global
//         console.log('updated deckIndex:', deckIndex);

//     displayGamePage(deckIndex); //display with correct title

//     let arrayShuffled = getShuffledArray(deckIndex); //retrieve correct array, shuffled words
//         console.log('shuffled array:', arrayShuffled);

//     let jumbledWordWithHints = getJumbledWords(arrayShuffled, topics[deckIndex].wordsAndHints); //jumble the individual words
//         console.log('jumbled words w hints:', jumbledWordWithHints);

//     let randomWordHintObj = getWordWithHint(jumbledWordWithHints);
//         console.log('random word/hint:', randomWordHintObj)

//     displayWordHint(randomWordHintObj);

//     // nextBtn.addEventListener
// }