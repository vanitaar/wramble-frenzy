//console.log('Wramble Frenzy') //smoke test
// console.log(allDecks[0].children[0].innerText)

// caching all req'd elements:
const startPage = document.querySelector('.start-page'); //console.log(startPage) // console.log(startPage.style)
const gamePage = document.querySelector('.game-container')
const allDecks = document.getElementsByClassName('deck')  //console.log(allDecks) --> [topic1, topic2,...]
const gameTopicHeader = document.querySelector('h2') // console.log(gameTopicHeader)

//buttons on gamePage
const returnToStartBtn = document.querySelector('.return-start-btn')

function goGamePage(event){
    // console.log(event);
    const deckIndex = Array.from(allDecks).indexOf(event.currentTarget); //currentTarget will target parent always
    startPage.style.display = 'none';
    gamePage.style.display = 'flex';
    gameTopicHeader.innerText = allDecks[deckIndex].children[0].innerText; //'In the sky and beyond'
}

function goStartPage(){
    gamePage.style.display = 'none';
    startPage.style.display = 'block';
}

//event listener for single specified deck:
// allDecks[0].addEventListener('click', goGamePage)

//event listener applied to any of the deck from allDecks
Array.from(allDecks).forEach((deck) => {
    deck.addEventListener('click', goGamePage)
});

//try another deck-->returns to start page
returnToStartBtn.addEventListener('click', goStartPage)


console.log(topics.topic)