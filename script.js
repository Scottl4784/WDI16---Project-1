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

// array holding the players current cards
let playerCards = []

// array holding the dealers current cards
let dealerCards = []

// When the player presses the deal button deal 2 cards to the dealer and 2 cards to the player from the cards array
function deal() {
    reset()
    // variable to select a random card value from the arrays
    for (let i = 0; i < 2; i++) {
        if (playerCards.length < 2) {
            playerCards.push(cardsValue[Math.floor(Math.random() * cardsValue.length)])
            dealerCards.push(cardsValue[Math.floor(Math.random() * cardsValue.length)])
        }
    }
    let playerTotal = playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    let dealerTotal = dealerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    if (playerTotal > 21) {
        alert('bust on deal')
    }
    if (dealerTotal > 21) {
        alert('dealer bust on deal')
    }
    $('.player-total').text(`${playerTotal}`)
    $('.dealer-total').text(`${dealerTotal}`)
}

// if the player clicks the hit button deal another random card to the player and update the total
function hit() {
    // checks to make sure player has started the game
    if (playerCards.length >= 2) {
        playerCards.push(cardsValue[Math.floor(Math.random() * cardsValue.length)])
    }
    let playerTotal = playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    // if player has clicked deal and has 2 cards already allow this
    if (playerTotal > 21) {
        alert('Bust!')
    }
    // console.log('hit',playerCards, dealerCards)
    $('.player-total').text(`${playerTotal}`)
    // reset()
}




function stand() {
    let playerTotal = playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    let dealerTotal = dealerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    $('.dealer-total').text(`${dealerTotal}`)
    //  Checks for win conditions
    if (dealerTotal < 21 && dealerTotal < playerTotal) {
        dealerCards.push(cardsValue[Math.floor(Math.random() * cardsValue.length)])
        stand()
    }
    if (dealerTotal >= 17) {
        if (playerTotal > dealerTotal || dealerTotal > 21) {
            alert('You Win!')
            return
        }
        if (playerTotal < dealerTotal) {
            alert('You Lose')
            return
        }
        if (playerTotal == dealerTotal) {
            alert('Push!')
            return
        }
        reset()
    }
}
function reset() {
    playerCards = []
    dealerCards = []
    console.log('game reset')
}

$('.deal').on('click', function () {
    deal()
    // console.log(playerCards)
    // console.log(dealerCards)
})
$('.hit').on('click', function () {
    hit()
    // console.log(playerCards)
    // console.log(dealerCards)
})
$('.stand').on('click', function () {
    stand()
    console.log('player', playerCards)
    console.log('dealer', dealerCards)
})






// assign matching values from the cardsValue array to the cards dealt to each player
// assign the total of the player cards to the player-total class

// if the player total exceeds 21 then trigger "Bust!" toast
// if the player clicks the stand button end player turn and go to dealer
// assign random cards from the cards array to dealer until dealer total is greater than or equal to player total or dealer total is greater than 21
// if dealer total is greater than or equal to player total and less than 21 trigger "You lose" toast
// if dealer total is less than player total or greater than 21 trigger "You Won!" toast 
