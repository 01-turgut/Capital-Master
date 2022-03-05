const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-container'));
const questionCounterText = document.getElementById('questnum')
const scoreText = document.getElementById('score');
const imgContainer = document.getElementById('imgContainer');
const gameContainer = document.getElementById('choices-container');



let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Here I will create my questions array
let questions = [{
        question: 'What\'s the capital of Italy?',
        choices: ['Rome', 'Paris', 'Venice', 'Florence'],
        answer: 1,
        imageURL: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        question: 'What\'s the capital of Spain?',
        choices: ['Barcelona',
            'Seville',
            'Madrid',
            'Valancia'
        ],
        answer: 3,
        imageURL: "https://www.austrianblog.com/media/images/moskau-reisefuehrer_qm5oxfp.width-1600.jpg"

    },
    {
        question: 'What\'s the capital of Ireland?',
        choices: ['Galway',
            'Cork',
            'Belfast',
            'Dublin'
        ],
        answer: 4,
        imageURL: "https://www.austrianblog.com/media/images/moskau-reisefuehrer_qm5oxfp.width-1600.jpg"

    },
    {
        question: 'What\'s the capital of Greece?',
        choices: ['Athens',
            'Patras',
            'Larissa',
            'Chania'
        ],
        answer: 1,
        imageURL: "https://www.austrianblog.com/media/images/moskau-reisefuehrer_qm5oxfp.width-1600.jpg"

    },
    {
        question: 'What\'s the capital of Germany?',
        choices: ['Hamburg',
            'Frankfurt',
            'Berlin',
            'Munich'
        ],
        answer: 3,
        imageURL: "https://www.austrianblog.com/media/images/moskau-reisefuehrer_qm5oxfp.width-1600.jpg"

    },
    {
        question: 'What\'s the capital of Russia?',
        choices: ['Moscow',
            'Saint Petersburg',
            'Nizhny Novgorod',
            'Kazan'
        ],
        answer: 1,
        imageURL: "https://www.austrianblog.com/media/images/moskau-reisefuehrer_qm5oxfp.width-1600.jpg"

    },
    {
        question: 'What\'s the capital of Portugal?',
        choices: ['Porti',
            'Coimbra',
            'Lisbon',
            'Braga'
        ],
        answer: 3,
        imageURL: "https://images.pexels.com/photos/4304222/pexels-photo-4304222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

    },
    {
        question: 'What\'s the capital of Sweden?',
        choices: ['Stockholm',
            'Malmö',
            'Gothenburg',
            'Kiruna'
        ],
        answer: 1,
        imageURL: "https://www.austrianblog.com/media/images/moskau-reisefuehrer_qm5oxfp.width-1600.jpg"

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

//This function is for calling the new question whenever user clicks on any choice 

getNewQuestion = () => {
    //@CC Hide Image . Show Question
    gameContainer.style.display = "block"
    imgContainer.style.display = "none"
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        // Go to end page
        return window.location.assign("/end.html");
    }
    // This will count and show the user,  the number of the question they are on
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + maxQuestions;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    //@CC added index variable for the answers
    var idx = 0;
    choices.forEach(choice => {
        console.log(choice)
        const number = choice.dataset['number'];
        //@CC take the question at the index
        choice.querySelector(".choice-text").innerText = currentQuestion.choices[idx];
        idx++;
    });
    // This will stop showing the same questions again
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

/*
  This will add background color to the choices depends on users answer
  if correct background will be green 
  if incorrect backgroud will be red
 */
showImage = () => {
    //@CC Hide Question . Show Image
    gameContainer.style.display = "none"
    imgContainer.src = currentQuestion.imageURL;
    imgContainer.style.display = "block"
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.currentTarget;
        const selectedAnswer = Number(selectedChoice.dataset.number);

        //@CC added -1 becuas of arra starts at 0
        const classToApply =
            selectedAnswer == currentQuestion.answer  ? 'correct' : 'incorrect'


        if (classToApply === 'correct') {
            incrementScore(correctBonus);
        }



        selectedChoice.classList.add(classToApply);

        // This will wait 1 second to apply created classes below
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply)
            showImage();
            setTimeout(() => {
                getNewQuestion();

            }, 2000)

        }, 800)
    });

})

// This will increment the users score when they answer correct
function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
};


startGame();