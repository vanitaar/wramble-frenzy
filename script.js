//console.log('Wramble Frenzy') //smoke test
// console.log(allDecks[0].children[0].innerText)

//---------------------------CACHING all req'd elements-----------------------------------------

import {topics} from './wordList.js';

const startPage = document.querySelector('.start-page'); //console.log(startPage) // console.log(startPage.style)
const gamePage = document.querySelector('.game-container')
const allDecks = document.getElementsByClassName('deck')  //console.log(allDecks) --> [topic1, topic2,...]
const gameTopicHeader = document.querySelector('h2') // console.log(gameTopicHeader)
const displayedWord = document.querySelector('.word') //console.log(displayedWord)
const showHintBtn = document.querySelector('.show-hint-btn') //console.log(showHintBtn)
const hint = document.querySelector('.hint-text')


//buttons on gamePage
const returnToStartBtn = document.querySelector('.return-start-btn')

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
    return letters.join(''); //join the jumbled letters into one word --> displayed
}



function goGamePage(event){
    // console.log(event);
    const deckIndex = Array.from(allDecks).indexOf(event.currentTarget); //currentTarget will target parent always
    startPage.style.display = 'none';
    gamePage.style.display = 'flex';
    gameTopicHeader.innerText = allDecks[deckIndex].children[0].innerText; //display apt topic

    let wordsArray = []; //initialize array
    topics.forEach(topic => {
        if (topic.topicName === allDecks[deckIndex].children[0].innerText) { 
        wordsArray = Object.keys(topic.wordsAndHints); //chache all words from chosen topic into an array
        let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)] //pick a random word from list
        let jumbledWord = jumbleLetters(randomWord); //use function to jumble letters
        displayedWord.innerText = jumbledWord; //display jumbled word
        } 
    });


}



//event listener for single specified deck:// allDecks[0].addEventListener('click', goGamePage)

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



//workings-----------------------------------------------------------------------------------

// console.log(topics) // console.log(topics[0].topic) //testing link to wordList.js

// matching deck topic to topic from wordList // console.log(allDecks[0].children[0].innerText === topics[0].topic) //true

// const deckIndex = 0;
// const clickedTopicText = allDecks[deckIndex].children[0].innerText;
// console.log(clickedTopicText)

// topics.forEach(topic => {
//     if (topic.topicName === allDecks[deckIndex].children[0].innerText) { 
//         console.log(Object.keys(topic.wordsAndHints)); //returms []
//     } 
// });

