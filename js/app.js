/******************************************************************************
* Welcome to the program! What follows is hours of my life... Be gentle!
* And with that established... scroll down to the bottom for the start point
/*****************************************************************************
/*
*******************************************************************************
* Variable declaration for global scope (and because I like C...)
*******************************************************************************
*/
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

/*
*******************************************************************************
* Seventeenth function: restarts the session (called from the fourth function)
*******************************************************************************
*/

function restart() {
    console.log('Hit restart');
    location.reload();
};

/*
*******************************************************************************
* Sixteenth function: populates the modal with the session details
*******************************************************************************
*/

function populateModal(modal) {

    let starScore = starSelector.innerHTML;
    let modalText =`
    <h1>Congratulations!</h1>
    <h2>You completed the game in:</h2>
    <h2>${hours} hours, ${minutes} mins, and ${seconds} seconds</h2>
    <h2>In ${clickCount} moves</h2>
    <h2>Giving you an overall star rating of:</h2>
    <h2 class="outputStars">${starScore}</h2>`;
    modal.insertAdjacentHTML('afterbegin', modalText);
};

/*
*******************************************************************************
* Fifteenth function: clears the timer
*******************************************************************************
*/

function endtimer() {
    clearInterval(timer);
};

/*
*******************************************************************************
* Fourteenth function: this is inevitable.
* - it calls the endtimer function to stop the clock
* - it then proceeds to call the populateModal function to enter session details
* - and after a nice little finger snap, the modal is displayed...or is it?
*******************************************************************************
*/

function endGame() {
    endtimer();
    populateModal(modalContentSelector);
    modalSelector.classList.toggle("displayModal");
};

/*
*******************************************************************************
* Thirteenth function:
* - in the event of a no match, the card's classes are set to 'open show nomatch'
* - the cleanUpFlag is set to 1 so that the code resets the classes on the next click
*******************************************************************************
*/

function noMatch() {
    cardOne.srcElement.classList.remove('match');
    cardOne.srcElement.classList.add('nomatch');
    cardTwo.srcElement.classList.add('open', 'show', 'nomatch');
    cleanUpFlag = 1;
    cardHolder = [];
    //console.log('Not a match!');
};

/*
*******************************************************************************
* Twelfth function:
* - if 8 cards match, the game ends by calling the endGame function
* - otherwise, both matched cards have their classes set to 'open show match'
*******************************************************************************
*/

function cardsMatch() {
    if (winCondition != 8) {
        //console.log('Match! ' + winCondition);
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

/*
*******************************************************************************
* Eleventh function:
* - the icons of cardOne and cardTwo are placed in the cardHolder array
* - if they match, the winCondition variable is incremented by 1
* - the cardsMatch function is then called
*
* - if the icons don't mach, noMatch is called
*******************************************************************************
*/

function compareCards() {
    if (cardHolder[0] == cardHolder[1]) {
        winCondition += 1;
        cardsMatch();
    } else {
        noMatch();
    };
};

/*
*******************************************************************************
* Tenth function:
* - the first click event is added to cardOne.
* - the class for cardOne is then switched to 'open' and 'show'
* - the icon associated with the event (innerHTML) is pushed to cardHolder
*
* - to avoid the first card being clicked twice, flow control is introduced
* - if the class of the second click is 'card', the event is set to cardTwo
* - the innerHTML of CardTwo is added to the cardHolder array
* - finally, the comparecards() function is used to determine if the icons match
*******************************************************************************
*/

function updateClass(event) {
    if (cardHolder.length == 0) {
        cardOne = event;
        cardOne.srcElement.classList.add('open', 'show');
        cardHolder.push(cardOne.target.innerHTML);
        //console.log(cardOne);
    } else if (event.srcElement.className == "card") {
        cardTwo = event;
        cardHolder.push(cardTwo.target.innerHTML);
        compareCards();
    } else {
        return;
        // console.log(event) allows us to see the characteristics of an object
    };
};

/*
*******************************************************************************
* Ninth function: removes stars based on the number of clicks registered
*******************************************************************************
*/

function updateStars() {
    if (clickCount < 32) {
        //console.log("don't delete a star now");
    } else if (clickCount == 32) {
        starSelector.removeChild(starSelector.childNodes[1]);
        //console.log("delete a star now");
    } else if (clickCount == 64) {
        starSelector.removeChild(starSelector.childNodes[2]);
        //console.log("delete a star now");
    } else if (clickCount == 88) {
        starSelector.removeChild(starSelector.childNodes[3]);
        //console.log("delete a star now");
    };
};

/*
*******************************************************************************
* Eighth function: starts the timer once a click is registered
*******************************************************************************
*/

function startTimer() {
    if (clickCount == 1) {
        timer = setInterval(function() {
            seconds ++;
            secondSelector.innerText = seconds % 60;
            minutes = minuteSelector.innerText = parseInt(seconds / 60);
            hours = hourSelector.innerText = parseInt(minutes / 60);
        }, 1000);
    } else if (clickCount > 1) {
        return;
        // credit: http://logicalmoon.com/2015/05/using-javascript-to-create-a-timer/
    };
};

/*
*******************************************************************************
* Seventh function: logs the number of clicks
*******************************************************************************
*/

function updateMoves() {
    clickCount += 1;
    moveCountSelector.innerHTML = clickCount;
};

/*
*******************************************************************************
* Sixth function: makes sure that the clicked card isn't already flipped
* - the cleanUpFlag is set at the thirteenth function
*******************************************************************************
*/

function cleanUp() {
    if (cleanUpFlag == 1) {
        cardOne.srcElement.classList.remove('open', 'show', 'nomatch');
        cardTwo.srcElement.classList.remove('open', 'show', 'nomatch');
        cleanUpFlag = 0;
    } else {
        return;
    };
};

/*
*******************************************************************************
* Fifth function: executed once a card has been clicked once
*******************************************************************************
*/

function cardClicked(event) {
    if (event.target && event.target.nodeName == "LI") {
        cleanUp();
        updateMoves();
        startTimer();
        updateStars();
        updateClass(event);
        // with thanks to: https://davidwalsh.name/event-delegate
    };
};

/*
*******************************************************************************
* Fourth function: once the deck has been created, we listen for clicks
*******************************************************************************
*/

function runningProgram() {
    deckSelector.addEventListener('click', cardClicked);
    restartSelector.addEventListener('click', restart);
};

/*
*******************************************************************************
* Third function: generates HTML cards from shuffled deck
*******************************************************************************
*/

function generateCard(cards, deck) {
    for (let card of cards) {
        let newCards =`
        <li class="card">
            <i class="fa ${card}"></i>
        </li>`;
        deck.insertAdjacentHTML('afterbegin', newCards);
    };
};

/*
*******************************************************************************
* Second function: shuffles cards and returns array
*******************************************************************************
*/

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        // Shuffle function from http://stackoverflow.com/a/2450976
    };
    return array;
};

/*
*******************************************************************************
* First function: takes existing cards and passes them to the shuffle function
*******************************************************************************
*/

function startPoint() {
    cardList = shuffle(cardList);
    newCardList = generateCard(cardList, deckSelector);
    return null;
};

/*
*******************************************************************************
* Start of program
*******************************************************************************
*/

startPoint();
runningProgram();
