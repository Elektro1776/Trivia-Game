$(document).ready(function() {
// Create a function that creates the start button and initial screen
var gameHTML;
var questionArray = [
	{
		question: 'What is the capital of Australia?',
		options: [ 'Canberra', 'Melbourne', 'Sydney', 'Darwin'],
		answer: 'A. Canberra',
	},
	{
		question: 'What is the capital of Liberia?',
		options: [ 'Arthington', 'Monrovia', 'Tuzon', 'Marshall' ],
		answer: 'B. Monrovia',
	},
	{
		question: 'What is the capital of Taiwan?',
		options: ["Tainan City", "Taichung", "Taipei", "Hsinchu"],
		answer: 'C. Taipei',
	},
	{
		question: 'What is the capital of Japan?',
		options: ["Kyoto","Hiroshima","Tokyo","Osaka"],
		answer: 'C. Tokyo',
	},
	{
		question: 'What is the capital of China?',
		options: ["Hong Kong", "Macau", "Shanghai", "Beijing"],
		answer: 'D. Beijing',
	},
	{
		question: 'What is the capital of Turkey?',
		options: ["Ankara","Istanbul","Antalya","Bursa"],
		answer: 'A. Ankara',
	},
	{
		question: 'What is the capital of Colombia?',
		options: ["Medellin", "Bogota", "Cartagena", "Cali"],
		answer: 'B. Bogota',
	},
	{
		question: 'What is the capital of India?',
		options: ["Mumbai","Hyderabad","Bangalore","New Delhi"],
		answer: 'D. New Delhi',
	}
];
var startScreen;
var counter = 30;
var imageArray = ["<img class='center-block img-right' src='./assets/img/australia.png'>", "<img class='center-block img-right' src='./assets/img/liberia.png'>", "<img class='center-block img-right' src='./assets/img/taiwan.png'>", "<img class='center-block img-right' src='./assets/img/japan.png'>", "<img class='center-block img-right' src='./assets/img/china.png'>", "<img class='center-block img-right' src='./assets/img/turkey.png'>", "<img class='center-block img-right' src='./assets/img/colombia.png'>", "<img class='center-block img-right' src='./assets/img/india.png'>"];
var correctAnswers = ["A. Canberra", "B. Monrovia", "C. Taipei", "C. Tokyo", "D. Beijing", "A. Ankara", "B. Bogota", "D. New Delhi"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("./assets/sound/button-click.mp3");
function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='./assets/img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='./assets/img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	console.log(' QUESTION ARRAY ?????', questionArray[questionCounter].question);
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter].question + "</p><p class='first-answer answer'>A. " + questionArray[questionCounter].options[0] + "</p><p class='answer'>B. "+ questionArray[questionCounter].options[1]+"</p><p class='answer'>C. "+ questionArray[questionCounter].options[2] + "</p><p class='answer'>D. "+ questionArray[questionCounter].options[3] + "</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}
function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	console.log(' WHAT IS OUR QUESTION OBJECT HERE?????', questionArray);
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	clickSound.play();
	selectedAnswer = $(this).text();
	console.log(' WHAT IS THE ANSWER?????', questionArray[questionCounter].answer);
	if(selectedAnswer === questionArray[questionCounter].answer) {

		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper
