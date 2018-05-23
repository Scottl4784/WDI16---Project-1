// Assigns value to each of the cards in the cards array
let cardsValue = [11, 11, 11, 11, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]

// holds the suits of the cards
cardSuits = ['C', 'H', 'D', 'S']

// array holding the players current cards
const playerCards = []

// array holding the dealers current cards
const dealerCards = []

// stores players wins
let playerWins = 0
$('.player-wins').text(`Wins = ${playerWins}`)

// pulls a random card from the cardsvalue array
function randomNumber() {
    return Math.floor(Math.random() * cardsValue.length)
}
// selects a random suit
function randomSuit() {
    return cardSuits[Math.floor(Math.random() * cardSuits.length)]

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
        playerTotal - 10
    }
    // input player and dealer score into the DOM
    $('.player .player-total').html(`<h2>Player - ${playerTotal}</h2>`)
    for (i = 0; i < playerCards.length; i++) {
        $('.player .player-cards').append(`<img src="images/${playerCards[i]}${randomSuit()}.png">`)
    }
    $('.dealer .dealer-total').html(`<h2>Dealer - ${dealerTotal}</h2>`)
    for (i = 0; i < dealerCards.length; i++) {
        $('.dealer .dealer-cards').append(`<img src="images/${dealerCards[i]}${randomSuit()}.png">`)
    }
    $('.dealer .dealer-cards').append(`<img id="cardbackground" src="images/red_back.png">`)

}

// if the player clicks the hit button deal another random card to the player and update the total
function hit() {
    // checks to make sure player has started the game
    if (playerCards.length >= 2) {
        playerCards.push(cardsValue.splice(randomNumber(), 1)[0])
    }
    let playerTotal = playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    // pushes dealt card images into the DOM
    $('.player .player-total').html(`<h2>Player - ${playerTotal}</h2>`)
    for (i = playerCards.length - 1; i < playerCards.length; i++) {
        $('.player .player-cards').append(`<img src="images/${playerCards[i]}${randomSuit()}.png">`)
    }
    if (playerTotal > 21) {
        $('.toast').html('<div class="alert alert-danger" role="alert">Bust!</div>')
    }
}

// triggered by pressing the stand button and passing to the dealer
function stand() {
    // flips over the dealers second card
    if (dealerCards.length < 2) {
        dealerCards.push(cardsValue.splice(randomNumber(), 1)[0])
        $('.dealer .dealer-cards').append(`<img src="images/${dealerCards[1]}${randomSuit()}.png">`)
        $('.dealer .dealer-cards img').remove('#cardbackground')
    }
    // sets variables used for win conditions
    let playerTotal = playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    let dealerTotal = dealerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0)
    // Updates the dealer total in the DOM
    $('.dealer .dealer-total').html(`<h2>Dealer - ${dealerTotal}</h2>`)
    
    //  deals cards to the dealer until he has at least 17 or is higher than the player
    if (dealerTotal <= 17 || dealerTotal < playerTotal) {
        dealerCards.push(cardsValue.splice(randomNumber(), 1)[0])
        // Pushes new cards into the DOM
        for (i = dealerCards.length - 1; i < dealerCards.length; i++) {
            $('.dealer .dealer-cards').append(`<img src="images/${dealerCards[i]}${randomSuit()}.png">`)
        }
        stand()
    }
    // checks for win conditions
    if (dealerTotal >= 17) {
        if (playerTotal > dealerTotal || dealerTotal > 21) {
            $('.toast').html('<div class="alert alert-success" role="alert">You have Won!</div>')
            playerWins ++
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
    }
}

// resets the game
function reset() {
    cardsValue = [11, 11, 11, 11, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    playerCards.splice(0, playerCards.length)
    dealerCards.splice(0, dealerCards.length)
    $('.player .player-cards').html('')
    $('.dealer .dealer-cards').html('')
    $('.toast').html('')
    $('.player-wins').text(`Wins = ${playerWins}`)
}
// event listeners for buttons
// activates the deal function when user clicks deal button
$('.deal').on('click', function () {
    deal()
})
// activates the hit function when user clicks hit button
$('.hit').on('click', function () {
    if (playerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0) <= 21) {
        hit()
    }
})
// activates the stand function when user clicks stand button
$('.stand').on('click', function () {
    if (dealerCards.reduce((pv, cv) => {
        return pv + (parseFloat(cv) || 0)
    }, 0) <= 21) {
        stand()
    }
})