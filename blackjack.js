// Suits don't matter, only numbers

// Build card deck

function blackjackgame() {
  let whoWon = ''

  let cards = []
  let numbers = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
  numbers.forEach(x => cards.push(...Array(4).fill(x)))

  // Create a comparator function for shuffling
  const compare = (x, y) => {
    if (x.order < y.order)
      return -1
    if (x.order > y.order)
      return 1
    return 0
  }

  let deck = []
  cards.forEach(x => deck.push({order: Math.random(), card: x}))
  deck = deck.sort(compare)

  // console.log(deck)

  // Once we've finished shuffling, we don't care about order property anymore
  let newDeck = []
  deck.forEach(x => newDeck.push(x.card))

  // Both players originally have 0 cards in their hand
  let DealerHand = []
  let SamHand = []

  // Nothing executes after the return???
  const remove = (number, deck) => {
    deck = deck.splice(0, number)
    return deck
  }

  const draw = (number, deck) => {
    remove(number, deck)
    return newDeck.slice(0, number)
  }

  // Count score
  const mapCards = x => {
    if ([2, 3, 4, 5, 6, 7, 8, 9, 10].includes(x)) {
      return x
    }
    if (x === 'J' | x === 'Q' | x === 'K') {
      return 10
    }
    if (x === 'A') {
      return 11
    }
  }

  const countCards = (hand) => {
    return hand.map(mapCards).reduce((a,b) => a + b)
  }

  // Initial state of the game
  DealerHand = draw(2, newDeck)
  SamHand = draw(2, newDeck)

  // console.log(`Sam's original hand is: ${SamHand}`)
  // console.log(`Dealer's original hand is: ${DealerHand}`)
  //
  // console.log(`Sam's original count is: ${countCards(SamHand)}`)
  // console.log(`Dealer's original count is: ${countCards(DealerHand)}`)

  if (countCards(DealerHand) === 21 && countCards(SamHand) === 21) {
    whoWon = 'Both'
    return console.log(whoWon)
  } else if (countCards(DealerHand) === 21 && countCards(SamHand) !== 21) {
    whoWon = 'Dealer'
    return console.log(whoWon)
  } else if (countCards(DealerHand) !== 21 && countCards(SamHand) === 21) {
    whoWon = 'Sam'
    return console.log(whoWon)
  } else {
    while (countCards(SamHand) < 17) {
      SamHand = [...SamHand, ...draw(1, newDeck)]
    }
    if (countCards(SamHand) > 21) {
      whoWon = 'Dealer'
      console.log(whoWon)
    } else {
      while (countCards(SamHand) > countCards(DealerHand)) {
        DealerHand = [...DealerHand, ...draw(1, newDeck)]
      }
      if (countCards(DealerHand) > 21) {
        whoWon = 'Sam'
        console.log(whoWon)
        return whoWon
      } else if (countCards(DealerHand) === 21){
        whoWon = 'Dealer'
        console.log(whoWon)
        return whoWon
      } else {
        whoWon = 'Both'
        console.log(whoWon)
        return whoWon
      }
    }

    // console.log(`Sam's new hand: ${SamHand}`)
    // console.log(`Sam's new count: ${countCards(SamHand)}`)
    // console.log(`Dealer's new hand: ${DealerHand}`)
    // console.log(`Dealer's new count: ${countCards(DealerHand)}`)
  }
  return whoWon
}


let winningArray = []
for (let i = 0; i < 100; i ++) {
  winningArray.push(blackjackgame())
}
console.log(winningArray)

// let winningArray = []
// for (let i = 0; i < 100; i++) {
//   winningArray.push(blackjackgame())
// }
//
// console.log(typeof winningArray)



//Done!!!
// Side note: Is there any way to run the simulation over and over again to see what fraction of times Sam won vs. the dealer?
