/*
 * Create a list that holds all of your cards
 */

let cardList = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"
];

let newCardList = "";
let cardOne = "";
let cardTwo = "";
const deckSelector = document.querySelector('.deck');
const restartSelector = document.querySelector('.restart');
const moveCountSelector = document.querySelector('.moveNumber');
const starSelector = document.querySelector('.stars');
const modalSelector = document.querySelector('.modal');
const modalContentSelector = document.querySelector('.modalContent')
const secondSelector = document.querySelector('.seconds');
const minuteSelector = document.querySelector('.minutes');
const hourSelector = document.querySelector('.hours');
let winCondition = 0;
let clickCount = 0;
let cardHolder = [];
let cleanUpFlag = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = 0;
let starScore = "";
//let firstCard = [];

function generateCard(cards, deck) {
    for (let card of cards) {
        let newCards =`
        <li class="card">
            <i class="fa ${card}"></i>
        </li>`;
        deck.insertAdjacentHTML('afterbegin', newCards);
    }
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function restart() {
    console.log('Hit restart');
    location.reload();
};

function populateModal(modal) {

    let starScore = starSelector.innerHTML;
    let modalText =`
    <h1>Congratulations!</h1>
    <h2>You completed the game in:</h2>
    <h2>${hours} hours, ${minutes} mins, and ${seconds} seconds</h2>
    <h2>In ${clickCount} moves</h2>
    <h2>Giving you an overall star rating of:</h2>
    <h2> class="outputStars">${starScore}</h2>`;
    modal.insertAdjacentHTML('afterbegin', modalText);
};

function endtimer() {
    clearInterval(timer);
};

function endGame() {
    //window.alert('A winner is you!');
    //modalSelector.style.visibility ="visible";
    endtimer();
    populateModal(modalContentSelector);
    modalSelector.classList.toggle("displayModal");
};

function noMatch() {
    cardOne.srcElement.classList.remove('match');
    cardOne.srcElement.classList.add('nomatch');
    cardTwo.srcElement.classList.add('open', 'show', 'nomatch');
    cleanUpFlag = 1;
    cardHolder = [];
    console.log('Not a match!');
};

function cardsMatch() {
    if (winCondition != 8) {
        console.log('Match! ' + winCondition);
        cardOne.srcElement.classList.add('match');
        cardTwo.srcElement.classList.add('open', 'show', 'match');
        cardHolder = [];
    } else {
        cardOne.srcElement.classList.add('match');
        cardTwo.srcElement.classList.add('open', 'show', 'match');
        cardHolder = [];
        endGame();
    };
};

function compareCards() {
    if (cardHolder[0] == cardHolder[1]) {
        winCondition += 1;
        cardsMatch();
    } else {
        //cardHolder.length = 1;
        //cardHolder.pop();
        noMatch();
    };
};

// use console.log(event) to see all the characteristics of an object
function updateClass(event) {
    //detects whether array is empty
    if (cardHolder.length == 0) {
        cardOne = event;
        cardOne.srcElement.classList.add('open', 'show');
        cardHolder.push(cardOne.target.innerHTML);
        console.log(cardOne);
    } else if (event.srcElement.className == "card") {
        cardTwo = event;
        cardHolder.push(cardTwo.target.innerHTML);
        compareCards();
    } else {
        return;
    };
};

function updateStars() {
    if (clickCount < 32) {
        console.log("don't delete a star now");
    } else if (clickCount == 32) {
        starSelector.removeChild(starSelector.childNodes[1]);
        console.log("delete a star now");
    } else if (clickCount == 64) {
        starSelector.removeChild(starSelector.childNodes[2]);
        console.log("delete a star now");
    } else if (clickCount == 88) {
        starSelector.removeChild(starSelector.childNodes[3]);
        console.log("delete a star now");
    };
};

function startTimer() {
    // credit: http://logicalmoon.com/2015/05/using-javascript-to-create-a-timer/
    if (clickCount == 1) {
        timer = setInterval(function() {
            seconds ++;
            secondSelector.innerText = seconds % 60;
            minutes = minuteSelector.innerText = parseInt(seconds / 60);
            hours = hourSelector.innerText = parseInt(minutes / 60);
        }, 1000);
    } else if (clickCount > 1) {
        return;
    };
};

function updateMoves() {
    clickCount += 1;
    moveCountSelector.innerHTML = clickCount;
};

function cleanUp() {
    if (cleanUpFlag == 1) {
        cardOne.srcElement.classList.remove('open', 'show', 'nomatch');
        cardTwo.srcElement.classList.remove('open', 'show', 'nomatch');
        cleanUpFlag = 0;
    } else {
        return;
    };
};

// with thanks to: https://davidwalsh.name/event-delegate
function cardClicked(event) {
    if (event.target && event.target.nodeName == "LI") {
        cleanUp();
        updateMoves();
        startTimer();
        updateStars();
        updateClass(event);
        //console.log(event);
    };
};

function runningProgram() {
    deckSelector.addEventListener('click', cardClicked);
    restartSelector.addEventListener('click', restart);
};

function startPoint() {
    cardList = shuffle(cardList);
    newCardList = generateCard(cardList, deckSelector);
    return null;
};

startPoint();
runningProgram();


//console.log("You win!");
// while there aren't 8 matches, do this code
