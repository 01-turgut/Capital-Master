const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-container'));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Here I will create my questions array
let questions = [{
        question: 'What\'s the capital of Italy?',
        choice1: 'Rome',
        choice2: 'Paris',
        choice3: 'Venice',
        choice4: 'Florence',
        answer: 1,
    },
    {
        question: 'What\'s the capital of Spain?',
        choice1: 'Barcelona',
        choice2: 'Seville',
        choice3: 'Madrid',
        choice4: 'Valancia',
        answer: 3,
    },
    {
        question: 'What\'s the capital of Ireland?',
        choice1: 'Galway',
        choice2: 'Cork',
        choice3: 'Belfast',
        choice4: 'Dublin',
        answer: 4,
    },
    {
        question: 'What\'s the capital of Greece?',
        choice1: 'Athens',
        choice2: 'Patras',
        choice3: 'Larissa',
        choice4: 'Chania',
        answer: 1,
    },
    {
        question: 'What\'s the capital of Germany?',
        choice1: 'Hamburg',
        choice2: 'Frankfurt',
        choice3: 'Berlin',
        choice4: 'Munich',
        answer: 3,
    },
    {
        question: 'What\'s the capital of Russia?',
        choice1: 'Moscow',
        choice2: 'Saint Petersburg',
        choice3: 'Nizhny Novgorod',
        choice4: 'Kazan',
        answer: 1,
    },
    {
        question: 'What\'s the capital of Portugal?',
        choice1: 'Porti',
        choice2: 'Coimbra',
        choice3: 'Lisbon',
        choice4: 'Braga',
        answer: 3,
    },
    {
        question: 'What\'s the capital of Sweden?',
        choice1: 'Stockholm',
        choice2: 'Malmö',
        choice3: 'Gothenburg',
        choice4: 'Kiruna',
        answer: 1,
    }
];

const correctBonus = 10;
const maxQuestions = 8;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions)
        // Go to end page
        return window.location.assign("/index.html");

    questionCounter++;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
     currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.querySelector(".choice-text").innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.currentTarget;
        const selectedAnswer = Number(selectedChoice.dataset.number);

        const classToApply =
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        selectedChoice.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

        
        
    })

})

const init = () => {
    startGame();
};
init();