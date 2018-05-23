// Stores each of the cards in the deck
let cards = ['aceOfSpades', 'aceOfClubs', 'aceOfHearts', 'aceOfDiamonds',
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
let cardsValue = [11, 11, 11, 11, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]

// array holding the players current cards
const playerCards = []

// let playerFaceCards = []

// array holding the dealers current cards
const dealerCards = []

// pulls a random card from the cardsvalue array
function randomNumber() {
    return Math.floor(Math.random() * cardsValue.length)
}
// When the player presses the deal button deal 2 cards to the dealer and 2 cards to the player from the cards array
function deal() {
    reset()
    // variable to select a random card value from the arrays
    for (let i = 0; i < 2; i++) {
        playerCards.push(cardsValue.splice(randomNumber(), 1)[0])
    }
    dealerCards.push(cardsValue.splice(randomNumber(), 1)[0])
    // sums the total of the cards in the playercards array and puts it in playertotal 
    let playerTotal = playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    let dealerTotal = dealerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    if (playerTotal > 21) {
        reset()
    }
    // input player and dealer score into the DOM
    $('.player .player-total').html(`<h2>Player - ${playerTotal}</h2>`)
    for (i = 0; i < playerCards.length; i++) {
        $('.player .player-cards').append(`<img src="images/${playerCards[i]}.png">`)
    }
    $('.dealer .dealer-total').html(`<h2>Dealer - ${dealerTotal}</h2>`)
    for (i = 0; i < dealerCards.length; i++) {
        $('.dealer .dealer-cards').append(`<img src="images/${dealerCards[i]}.png">`)
    }
    $('.dealer .dealer-cards').append(`<img id="cardbackground" src="images/cardbackground.png">`)

}

// if the player clicks the hit button deal another random card to the player and update the total
function playerTurn() {
    // checks to make sure player has started the game
    if (playerCards.length >= 2) {
        playerCards.push(cardsValue.splice(randomNumber(), 1)[0])
    }
    let playerTotal = playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    // if player has clicked deal and has 2 cards already allow this
    if (playerTotal > 21) {
        $('.toast').html('<div class="alert alert-danger" role="alert">Bust!</div>')
    }
    $('.player .player-total').html(`<h2>Player - ${playerTotal}</h2>`)
    for (i = playerCards.length - 1; i < playerCards.length; i++) {
        $('.player .player-cards').append(`<img src="images/${playerCards[i]}.png">`)
    }
}



// triggered by pressing the stand button and passing to the dealer
function dealerTurn() {
    if (dealerCards.length < 2) {
        dealerCards.push(cardsValue.splice(randomNumber(), 1)[0])
        $('.dealer .dealer-cards').append(`<img src="images/${dealerCards[1]}.png">`)
        $('.dealer .dealer-cards img').remove('#cardbackground')
    }
    let playerTotal = playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    let dealerTotal = dealerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    // Updates the dealer total in the DOM
    $('.dealer .dealer-total').html(`<h2>Dealer - ${dealerTotal}</h2>`)
    // Pushes images into the DOM
    for (i = 2; i < dealerCards.length; i++) {
        $('.dealer .dealer-cards').append(`<img src="images/${dealerCards[i]}.png">`)
    }
    //  deals cards to the dealer
    if (dealerTotal <= 17 || dealerTotal < playerTotal) {
        dealerCards.push(cardsValue.splice(randomNumber(), 1)[0])
        dealerTurn()
    }
    if (dealerTotal > 21) {
        for (i = 0; i < dealerCards.length; i++) {
            if (dealerCards[i] === 11) {
                dealerTotal = dealerTotal - 11
            }
        }
    }
    // checks for win conditions
    if (dealerTotal >= 17) {
        if (playerTotal > dealerTotal || dealerTotal > 21) {
            $('.toast').html('<div class="alert alert-success" role="alert">You have Won!</div>')
            return
        }
        if (playerTotal < dealerTotal) {
            $('.toast').html('<div class="alert alert-danger" role="alert">You have lost</div>')
            return
        }
        if (playerTotal == dealerTotal) {
            $('.toast').html('<div class="alert alert-info" role="alert">Its a Push</div>')
            return
        }
        reset()
    }
}
// resets the game
function reset() {
    cardsValue = [11, 11, 11, 11, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    playerCards.splice(0, playerCards.length)
    dealerCards.splice(0, dealerCards.length)
    playerFaceCards = []
    $('.player .player-cards').html('')
    $('.dealer .dealer-cards').html('')
    $('.toast').html('')
    console.log('game reset')
}
// event listeners for buttons
$('.deal').on('click', function () {
    deal()
})
$('.hit').on('click', function () {
    playerTurn()
})
$('.stand').on('click', function () {
    dealerTurn()
})






// assign matching values from the cardsValue array to the cards dealt to each player
// assign the total of the player cards to the player-total class

// if the player total exceeds 21 then trigger "Bust!" toast
// if the player clicks the stand button end player turn and go to dealer
// assign random cards from the cards array to dealer until dealer total is greater than or equal to player total or dealer total is greater than 21
// if dealer total is greater than or equal to player total and less than 21 trigger "You lose" toast
// if dealer total is less than player total or greater than 21 trigger "You Won!" toast 
