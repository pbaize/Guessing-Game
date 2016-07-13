/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

// How can you eliminate global variables?
// I'd suggesting using the IIFE pattern (Immediately Invoked Function Expression), here is a resource
// about the IFFE pattern, see if you can implement it in this file! http://benalman.com/news/2010/11/immediately-invoked-function-expression/

var winningNumber = generateWinningNumber();
var guesses = [];

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber() {
	return Math.floor(100 * Math.random() + 1);
}

// Fetch the Players Guess

function playersGuessSubmission() {
	$("#submit-guess").on('click', function() {
		var playersGuess = +$(this).closest('div').find('input').val();
		$(this).closest('div').find('input').val('');
		if (playersGuess <= 100 && playersGuess >= 1) {
			checkGuess(playersGuess, guesses);
		} else {
			alert("Guess must be between 1 and 100!");
		}
	});
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(guess) {
	guessMessage(guess - winningNumber);
}

function guessMessage(diff) {
	var message = 'Too ';
	if (diff < 0) {
		message += "low! You are within ";
	} else {
		message += "high! You are within ";
	}
	message += (Math.floor(Math.abs(diff) / 10) * 10 + 10).toString() + ".";
	$('#tagline').text(message);
}
// Check if the Player's Guess is the winning number 

function checkGuess(guess) {
	$("#guessGoesHere").text(guess);
	var guesslog= "Your guesses: ";
	if (guess === winningNumber) {
		$("#guessGoesHere").css({
			"color": "#449D44"
		});
		$('#tagline').text('You Win!');
		$('.input-group').remove();
		$('#hint').remove();
	} else if ($.inArray(guess, guesses) === -1) {
		guesses.push(guess);
		var guessCount = guesses.length;
		console.log(guesses);
		$("#guessGoesHere").css({
			"color": "#C9302C"
		});
		if (guessCount === 10) {
			$('#tagline').text('GAME OVER');
			$('.input-group').remove();
			$('#hint').remove();
		} else if (guessCount === 9) {
			$('#guess').attr({
				'placeholder': "Last Guess"
			});
		} else {
			$('#guess').attr({
				'placeholder': 10 - guessCount + " guesses left"
			});
		}
		for (var i = 0; i < guesses.length; i++) {
			guesslog+=guesses[i].toString() +', ';
		}
		$("#guesslog").text(guesslog);
		$('#guesslog').css('visibility', 'visible');
		lowerOrHigher(guess);
	} else {
		$('#tagline').text('You already guessed that!');
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint() {
	var digit = winningNumber;
	while (digit > 10) {
		digit -= 10;
	}
	var wrong1 = Math.floor(10 * Math.random());
	while (wrong1 === digit) {
		wrong1 = Math.floor(10 * Math.random());
	}
	var wrong2 = Math.floor(10 * Math.random());
	while (wrong2 === digit || wrong2 === wrong1) {
		wrong2 = Math.floor(10 * Math.random());
	}
	var hint3 = [digit, wrong1, wrong2].sort();
	var hint2 = [digit, wrong1].sort();
	$("#hint").on('click', function() {
		var message = "The number ends in ";
		if (guesses.length < 5) {
			message += hint3[0].toString() + ', ' + hint3[1].toString() + ' or ' + hint3[2].toString()+'.';
		} else {
			message+=hint2[0].toString() + ' or ' + hint3[1].toString()+'.';
		}
		$('#tagline').text(message);
	});
}



/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	playersGuessSubmission();
	$("#guess").keydown(function(e) {
		if (e.which == 13) {
			$('#submit-guess').click();
		}
	});
	$("#reset").on('click', function() {
		location.reload();
	});
	provideHint();
});
