// Stores each of the cards in the deck
const cards = ['aceOfSpades', 'aceOfClubs', 'aceOfHearts', 'aceOfDiamonds',
    'twoOfSpades', 'twoOfClubs', 'twoOfHearts', 'twoOfDiamonds',
    'threeOfSpades', 'threeOfClubs', 'threeOfHearts', 'threeOfDiamonds',
    'fourOfSpades', 'fourOfClubs', 'fourOfHearts', 'fourOfDiamonds',
    'fiveOfSpades', 'fiveOfClubs', 'fiveOfHearts', 'fiveOfDiamonds',
    'sixOfSpades', 'sixOfClubs', 'sixOfHearts', 'sixOfDiamonds',
    'sevenOfSpades', 'sevenOfClubs', 'sevenOfHearts', 'sevenOfDiamonds',
    'eightOfSpades', 'eightOfClubs', 'eightOfHearts', 'eightOfDiamonds',
    'nineOfSpades', 'nineOfClubs', 'nineOfHearts', 'nineOfDiamonds',
    'tenOfSpades', 'tenOfClubs', 'tenOfHearts', 'tenOfDiamonds',
    'jackOfSpades', 'jackOfClubs', 'jackOfHearts', 'jackOfDiamonds',
    'queenOfSpades', 'queenOfClubs', 'queenOfHearts', 'queenOfDiamonds',
    'kingOfSpades', 'kingOfClubs', 'kingOfHearts', 'kingOfDiamonds']

// Assigns value to each of the cards in the cards array
const cardsValue = [11, 11, 11, 11, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]

// variable to select a random card value from the arrays
let randomCard = cardsValue[Math.floor(Math.random() * cardsValue.length)]

// array holding the players current cards
const playerCards = []

// array holding the dealers current cards
const dealerCards = []

// When the player presses the deal button deal 2 cards to the dealer and 2 cards to the player from the cards array
$('.deal').on('click', function () {
    for (let i = 0; i < 2; i++) {
            playerCards.push(randomCard)
    }
})


// assign matching values from the cardsValue array to the cards dealt to each player
// assign the total of the player cards to the player-total class
// if the player clicks the hit button deal another random card to the player and update the total
// if the player total exceeds 21 then trigger "Bust!" toast
// if the player clicks the stand button end player turn and go to dealer
// assign random cards from the cards array to dealer until dealer total is greater than or equal to player total or dealer total is greater than 21
// if dealer total is greater than or equal to player total and less than 21 trigger "You lose" toast
// if dealer total is less than player total or greater than 21 trigger "You Won!" toast 
