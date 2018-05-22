if (dealerTotal >= 17) {
    if (playerTotal > dealerTotal) {
        alert('You Win!')
    }
    if (playerTotal < dealerTotal) {
        alert('You Lose')
    }
    if (playerTotal == dealerTotal) {
        alert('Push!')
    }
}