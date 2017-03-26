
var questions = {
	questionsArray: []
}

var questionNo = 0;
var score = 0;

function addQuestion(questions,question, answer1, answer2, answer3, answer4, correctAnswer){
	questions.questionsArray.push({
		question: question,
		answers: [answer1, answer2, answer3, answer4],
		correctAnswer: correctAnswer
	});
}

function fillQuestionsArray() {
	addQuestion(questions, 'pytanie 1' ,'odpowiedz 1.1', 'odpowiedz 1.2', 'odpowiedz 1.3', 'odpowiedz 1.4', 0);
	addQuestion(questions, 'pytanie 2', 'odpowiedz 2.1', 'odpowiedz 2.2', 'odpowiedz 2.3', 'odpowiedz 2.4', 0);
	addQuestion(questions, 'pytanie 3', 'odpowiedz 3.1', 'odpowiedz 3.2', 'odpowiedz 3.3', 'odpowiedz 3.4', 0);
}


function hideOrShow(selector, hideSelector){
	selector.toggleClass(hideSelector);
}

function createQuestionHtml(element, questions){
	var itemsHtml = questions.questionsArray[questionNo].question;
	var htmlString = '<h1 class="question">'+ itemsHtml + '</h1>';
	element.html(htmlString);
}

function createAnswerHtml(element, questions){
	var currentQuestion = questions.questionsArray[questionNo];
	var answers = currentQuestion.answers.map(function(answer){	
		var indexOfAnswer = 0;
		var htmlString = '<div class="answer">' + answer + '<span class="answer-no hidden">' +  currentQuestion.answers.indexOf(answer) + '</span></div>' ;
		indexOfAnswer++;
		$(htmlString).insertAfter(element);
	});
}

function renderAnswers(element){
	createAnswerHtml(element, questions);
}

function renderScore(element){
	var htmlString = '<div class="question">Twój wynik to: ' + score + '!</div>';
	$(htmlString).insertAfter(element);

}

function addScore(element){
	var noOfAnswer = parseInt($(element).find('span').text());

	if (noOfAnswer === questions.questionsArray[questionNo].correctAnswer){
		console.log("Dobra odpowiedz");
		score++;
	}	
}

function readyToGo() {

	fillQuestionsArray();

	var buttonStart = '.buttonStart';
	var questionsElement = '.questions';
	var questionElement = '.question';
	var hideSection = 'hidden';
	var headerSection = '.header';
	var questionsObjLength = questions.questionsArray.length;


	$(buttonStart).on('click', 'button', function(event){
		hideOrShow($(buttonStart), hideSection);
		hideOrShow($(questionsElement), hideSection);
		createQuestionHtml($(questionsElement), questions);
		renderAnswers($(questionElement));
	});

	$(questionsElement).on('click' , 'div' , function(event){

		if (questionNo+1 < questionsObjLength) {	
			addScore($(this));	
			questionNo++;

			createQuestionHtml($(questionsElement), questions);
			renderAnswers($(questionElement));
		}
		else 
		{
			addScore($(this));		
			hideOrShow($(questionsElement), hideSection);
			renderScore($(headerSection));
		}

	});


}


$(readyToGo);