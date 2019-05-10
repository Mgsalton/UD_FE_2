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
const deckSelector = document.querySelector('.deck');

cardList = shuffle(cardList);
newCardList = generateCard(cardList, deckSelector);

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

// use console.log(event) to see all the characteristics of an object
function updateClass(event) {
    event.srcElement.classList.add('open', 'show');
};

// with thanks to: https://davidwalsh.name/event-delegate
function cardClicked(event) {
    if (event.target && event.target.nodeName == "LI") {
        updateClass(event);
        //console.log(event);
    };
};

deckSelector.addEventListener('click', cardClicked);
