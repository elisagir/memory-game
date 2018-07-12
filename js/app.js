/*
 * Create a list that holds all of your cards
 */

let cards = [
	"fa-diamond",
	"fa-diamond",
	"fa-paper-plane-o",
	"fa-paper-plane-o",
	"fa-anchor",
	"fa-anchor",
	"fa-bolt", "fa-bolt",
	"fa-cube",
	"fa-cube",
	"fa-leaf",
	"fa-leaf",
	"fa-bicycle",
	"fa-bicycle",
	"fa-bomb",
	"fa-bomb"
];
let cardOpen = [];
let moves = 0;
let starRating = 3;
let matchedCard = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// create card element
function createCard() {
    let cardList = shuffle(cards);
    cardList.forEach(function(card) {
        $('.deck').append('<li><i class="fa ' + card + ' card"></i></li>');
    })
}
createCard();

// game logic
function cardClick() {
	$('.card').on('click', function() {
		// disable double click
		if ($(this).hasClass('open')) {
			return;
		}
		$(this).addClass('show open flipInY');
		//store icon in array
		cardOpen.push($(this));
		//check open cards when count = 2
		if (cardOpen.length === 2) {
			moveCounter();
			// check if the 2 open cards have the same icon class
			if (cardOpen[0][0].classList[1] === cardOpen[1][0].classList[1]) {
				cardOpen.forEach(function(card){
					card.addClass('bounceIn match');
				});
				noClick();
				removeCardOpens();
				matchedCard += 1;
				congratulations();
			} else {
				cardOpen.forEach(function(card){
					card.addClass('shake wrong');
				});
				setTimeout(removeClasses, 1100);
				setTimeout(removeCardOpens, 1100);
			}
		}
	});
}
cardClick();


// disable clicks
function noClick() {
    cardOpen.forEach(function(card) {
        card.off('click');
    })
}

// reset card opens
function removeCardOpens() {
    cardOpen = [];
}

// close different cards by removing class
function removeClasses() {
    $('.card').removeClass('show open flipInY bounceIn shake wrong');
    removeCardOpens();
}

// count moves
function moveCounter() {
    moves++;
	$('.moves').html(moves);
	 if (moves === 15 || moves === 20){
        reduceStar();
		starRating--;
    }
	if (moves === 1) {
        $('.text').text(' Move');
    } else {
        $('.text').text(' Moves');
    }
}

// reduce star rating
function reduceStar(){
    let stars = $(".fa-star");
    $(stars[stars.length-1]).toggleClass("fa-star fa-star-o");
}

// timer
var second = 0,
    minute = 0;
var timer = document.querySelector('.timer');
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + 'min : ' + second + 'sec';
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

// start timer at first click on card
let clicks = 0;
$('.card').on('click', function() {
    clicks += 1;
    if (clicks === 1) {
        startTimer();
    }
});

// open popup when game is complete
function congratulations() {
    if (matchedCard === 8) {
        $('.winner-popup').addClass('is-visible');
        $('#total-moves').text(moves);
        $('#total-stars').text(starRating);
        finalTime = timer.innerHTML;
        $('#total-timer').text(finalTime);
        restartGame();
        clearInterval(interval);
    }
}

// restart the game
function restartGame() {
    $('button').on('click', function() {
        location.reload()
    });
}
restartGame();