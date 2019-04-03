
var qAKey = [
    {
        question: 'is true === true',
        answerList: ['t', 'f'],
        answer: 0,
        explaination: 'duh'
    },
    {
        question: 'is true === false',
        answerList: ['t', 'f'],
        answer: 1,
        explaination: 'duh'
    }
]
var started = false;
var timeGivenMS = 5000;
var numRounds = 2;
var randomSorted = randomSort(qAKey);
var winLose = null;
var bombTimer = null;
var displayTimer = null;
var currRound = 0;

function startAnim() {
    //moveBomb
    //fade in rope
    //fade out title
    $('#press').fadeOut(1000);
    //start 3 2 1 countdown
    //after delay move fire from countdown anim to rope start
}
function displayClock() {
    console.log("clock")
    //var display = $('#timer');
    startTimer((timeGivenMS / 1000));
}
function addZeroIfSingleDigit(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}
function startTimer(durationSec) {
    var timer = durationSec;
    var minutes;
    var seconds;
    displayTimer = setInterval(function () {
        console.log('second')
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        if (--timer <= 0) {
            $('#timer').text("00:00");
            clearInterval(displayTimer)
        } else {
            minutes = addZeroIfSingleDigit(minutes);
            seconds = addZeroIfSingleDigit(seconds);

            $('#timer').text(minutes + ":" + seconds);
        }
    }, 1000);
}

document.addEventListener('click', function () {
    if (!started) {
        started = true;
        startAnim();
        //after delay startQuiz()
        setTimeout(function () {
            lightFire();
            startQuiz();
            console.log('started quiz');
        }, 1000)
    }
})
function startQuiz() {
    // set timeout to timegivenms
    console.log('startquiz')
    bombTimer = setTimeout(function () {
        loseAnim();
        winLose = 'lose';
        displayResultsKey();
    }, timeGivenMS);
    // bomb.start()
    displayClock();
    displayRound(currRound)

}
function randomSort(inputArr) {
    //TODO
    return inputArr;
}
function displayRound() {
    console.log('display round', currRound)
    console.log(randomSorted[currRound].question)
    $('.question').html(
        $('<div>').text(randomSorted[currRound].question)
    )
    $('.answer-container').empty();
    for (var i = 0; i < randomSorted[currRound].answerList.length; i++) {
        $('.answer-container').append(
            $('<div>', { class: 'answer', 'data-index': i }).text(randomSorted[currRound].answerList[i])
        )
    }
    $('.answer').on('click', function () {
        if (!winLose) {
            randomSorted[currRound].chosen = $(this).attr('data-index');
            transitionQuestion();
        }
    })
}

$('.answer').on('click', function () {
    if (!winLose) {
        randomSorted[currRound].chosen = $(this).attr('data-index');
        transitionQuestion();
    }
})
function checkIfCorrect(qAItem) {
    if (qAItem.chosen === qAItem.answer) {
        return true;
    }
    return false;
}
function transitionQuestion() {
    console.log('trans')
    if ((currRound + 1) === numRounds) {
        win();
    } else {
        currRound++;
        displayRound();
    }
}
function win() {
    winLose = 'win'
    clearInterval(displayTimer)
    clearTimeout(bombTimer)
    console.log('win')
    displayResultsKey();
}
function loseAnim() {
    console.log('lose')
}
function displayResultsKey() {
    // div class results + win class or lose class
    $('.answer').hide()
    $('.question').hide()
    randomSorted.filter(function (qAItem) {
        return qAItem.chosen !== undefined;
    }).map(function (qAItem) {
        $('#results')
            .append($('<p>').text(qAItem.question))
            .append($('<p>').text(qAItem.answerList[qAItem.chosen]))
            .append($('<p>').text(qAItem.explaination))

        if (checkIfCorrect(qAItem)) {
            $('#results').append($('<p>').text("correct"))
        } else {
            $('#results').append($('<p>').text("incorrect"))
        }
    })
    $('#results').append(
        $('<button>').text("Play Again")
            .on('click', function () {
                playAgain()
            })
    )
    console.log(randomSorted)
}
function playAgain() {
    $('.answer').show().empty();
    $('.question').show().empty();
    $('#timer').fadeOut(0).text("00:05").fadeIn();
    $('#results').empty();

    $('#press').fadeIn();

    started = false;
    randomSorted = randomSort(qAKey);
    winLose = null;
    bombTimer = null;
    displayTimer = null;
    currRound = 0;
}



$('#temp').append($(window).width())
$('#temp').append($(window).height())

function lightFire(){
    var rope = document.getElementById('rope-border');
    var ropeEnd = document.getElementById('rope-end');

    rope.classList.remove("progress-rope");
    ropeEnd.classList.remove("lit");

    void rope.offsetWidth;
    void ropeEnd.offsetWidth;

    rope.classList.add("progress-rope");
    ropeEnd.classList.add("lit");
}

/*
Start screen with bomb in the middle and title 

Click starts countdown from 3 

Bomb moves to top left and rope fades in 

Red line spins around count down timer  

Then flys to left to ignite fire 

Timer counts down inside of bomb 

If all questions answered , hide fire and stop rope animation 

If out of time, bomb explodes  

Fire animation expands 

Stops on screen 

Red screen for loss  

Bomb fades away on win 
*/
