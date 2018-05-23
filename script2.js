const suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds']
const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]
const cards = []
function createDeck() {
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < faces.length; j++) {
            let card = { suit: suits[i], face: faces[j], value: values[j] }
            cards.push(card)
        }
    }
}

// array holding the players current cards
let playerCards = []

// let playerFaceCards = []

// array holding the dealers current cards
let dealerCards = []
function randomNumber() {
    return Math.floor(Math.random() * cards.length)
}
// When the player presses the deal button deal 2 cards to the dealer and 2 cards to the player from the cards array
function deal() {
    reset()
    // variable to select a random card value from the arrays
    for (let i = 0; i < 2; i++) {
        if (playerCards.length < 2) {
            playerCards.push(cards[randomNumber()].value)
            dealerCards.push(cards[randomNumber()].value)
        }
    }
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
    if (dealerTotal > 21) {
        reset()
    }
    // input player and dealer score into the DOM
    $('.player').html(`<h2>Player - ${playerTotal}</h2><p>${playerCards}</p>`)
    $('.dealer').html(`<h2>Dealer - ${dealerTotal}</h2><p>${dealerCards}</p>`)
}

// if the player clicks the hit button deal another random card to the player and update the total
function playerTurn() {
    // checks to make sure player has started the game
    if (playerCards.length >= 2) {
        playerCards.push(cards[randomNumber()].value)
    }
    let playerTotal = playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    // if player has clicked deal and has 2 cards already allow this
    if (playerTotal > 21) {
        $('.toast').text('Bust').css('color', 'red')
    }
    $('.player').html(`<h2>Player - ${playerTotal}</h2><p>${playerCards}</p>`)
}



// triggered by pressing the stand button and passing to the dealer
function dealerTurn() {
    let playerTotal = playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0).value
    let dealerTotal = dealerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    $('.dealer').html(`<h2>Dealer - ${dealerTotal}</h2><p>${dealerCards}</p>`)
    //  deals cards to the dealer
    if (dealerTotal <= 17 && dealerTotal < playerTotal) {
        dealerCards.push(cards[randomNumber()].value)
        dealerTurn()
    }
    // checks for win conditions
    if (dealerTotal >= 17) {
        if (playerTotal > dealerTotal || dealerTotal > 21) {
            $('.toast').text('You have won!').css('color', 'green')
            return
        }
        if (playerTotal < dealerTotal) {
            $('.toast').text('You have lost').css('color', 'red')
            return
        }
        if (playerTotal == dealerTotal) {
            $('.toast').text("It's a push")
            return
        }
        reset()
    }
}
// resets the game
function reset() {
    createDeck()
    playerCards = []
    dealerCards = []
    playerFaceCards = []
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






// assign matching values from the cards.value array to the cards dealt to each player
// assign the total of the player cards to the player-total class

// if the player total exceeds 21 then trigger "Bust!" toast
// if the player clicks the stand button end player turn and go to dealer
// assign random cards from the cards array to dealer until dealer total is greater than or equal to player total or dealer total is greater than 21
// if dealer total is greater than or equal to player total and less than 21 trigger "You lose" toast
// if dealer total is less than player total or greater than 21 trigger "You Won!" toast 
