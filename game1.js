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
    const timeDisplay = document.querySelector('#time')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []
    var attempts = []
    var firstMove = 0

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
            clearTimeout(t);
            resultDisplay.textContent = 'Congratulations! You found them all!';
        }
    }

    //flip your card
    function flipCard() {
        if (cardsChosen.length === 2) {
            return;
        }
        if (timeDisplay.textContent === "EXPIRED") {
            return;
        }
        if (firstMove === 0) {
            firstMove = 1;
            timer();
        }
        var cardId = this.getAttribute('data-id')
        var cardImage = this.getAttribute('src')
        if (cardImage === 'images/game1/blank.png') {
            cardsChosen.push(cardArray[cardId].name)
            cardsChosenId.push(cardId)
            this.setAttribute('src', cardArray[cardId].img)
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 1000)
            }
        }
    }

    createBoard()

    //stopwatch
    var seconds = 0;
    var minutes = 3;
    var hours = 0;

    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        timeDisplay.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        stopWatch();
    }
    function stopWatch() {
        t = setTimeout(add, 1000);
    }
    //stopWatch();

    //timer
    var totalTime = hours * 3600 + minutes * 60 + seconds

    

    function deduct() {
        totalTime--;
        var h = Math.floor((totalTime % (60 * 60 * 24)) / (60 * 60));
        var m = Math.floor((totalTime % (60 * 60)) / (60));
        var s = Math.floor((totalTime % (60)));

        timeDisplay.textContent = (h ? (h > 9 ? h : "0" + h) : "00") + ":" + (m ? (m > 9 ? m : "0" + m) : "00") + ":" + (s > 9 ? s : "0" + s);

        if (totalTime < 0) {
            clearTimeout(t);
            timeDisplay.textContent = "EXPIRED";
        }

        timer();
    }


    function timer() {
        t = setTimeout(deduct, 1000);
    }
    

})


