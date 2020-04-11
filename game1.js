document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
        {
            name: 'fries',
            img: 'images/game1/fries.png'
        },
        {
            name: 'fries',
            img: 'images/game1/fries.png'
        },
        {
            name: 'cheesburger',
            img: 'images/game1/cheeseburger.png'
        },
        {
            name: 'cheesburger',
            img: 'images/game1/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'images/game1/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/game1/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/game1/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/game1/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/game1/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/game1/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/game1/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/game1/pizza.png'
        },
    ];

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    const attemptsDisplay = document.querySelector('#attempts')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []
    var attempts = []

    //create your board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/game1/blank.png')
            card.setAttribute('data-id', i)
            card.setAttribute('class', 'card')
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            //alert('You found a match')
            cards[optionOneId].setAttribute('src', 'images/game1/white.png')
            cards[optionTwoId].setAttribute('src', 'images/game1/white.png')
            cardsWon.push(cardsChosen)
            attempts.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/game1/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/game1/blank.png')
            //alert('Sorry, try again')
            attempts.push(cardsChosen)
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        attemptsDisplay.textContent = attempts.length
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You found them all!'
        }
    }

    //flip your card
    function flipCard() {
        if (this.getAttribute('src') = 'images/game1/white.png') {
            return;
        } else {
            var cardId = this.getAttribute('data-id')
            cardsChosen.push(cardArray[cardId].name)
            cardsChosenId.push(cardId)
            this.setAttribute('src', cardArray[cardId].img)
        }
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBoard()
})