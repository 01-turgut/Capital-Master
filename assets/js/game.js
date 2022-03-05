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
        imageURL: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX4166650.jpg"
    },
    {
        question: 'What\'s the capital of Spain?',
        choices: ['Barcelona',
            'Seville',
            'Madrid',
            'Valancia'
        ],
        answer: 3,
        imageURL: "https://media.istockphoto.com/photos/madrid-highway-sign-picture-id498057654?k=20&m=498057654&s=170667a&w=0&h=QMOC2GLyitcfhuGTdxMM94xIJjzOfpsxZS_SYZvI1G4="

    },
    {
        question: 'What\'s the capital of Ireland?',
        choices: ['Galway',
            'Cork',
            'Belfast',
            'Dublin'
        ],
        answer: 4,
        imageURL: "https://travel.mqcdn.com/mapquest/travel/wp-content/uploads/2013/05/dublin-sign-440x250.jpg"

    },
    {
        question: 'What\'s the capital of Greece?',
        choices: ['Athens',
            'Patras',
            'Larissa',
            'Chania'
        ],
        answer: 1,
        imageURL: "https://www.picserver.org/highway-signs2/images/athens.jpg"

    },
    {
        question: 'What\'s the capital of Germany?',
        choices: ['Hamburg',
            'Frankfurt',
            'Berlin',
            'Munich'
        ],
        answer: 3,
        imageURL: "https://cdn.pixabay.com/photo/2015/05/30/20/54/berlin-790677_960_720.png"

    },
    {
        question: 'What\'s the capital of Russia?',
        choices: ['Moscow',
            'Saint Petersburg',
            'Nizhny Novgorod',
            'Kazan'
        ],
        answer: 1,
        imageURL: "https://i.pinimg.com/originals/f7/9b/ac/f79bacd0624a85894779bf58ff0e67e0.jpg"

    },
    {
        question: 'What\'s the capital of Portugal?',
        choices: ['Porti',
            'Coimbra',
            'Lisbon',
            'Braga'
        ],
        answer: 3,
        imageURL: "https://img.freepik.com/free-vector/lisbon-neon-sign_73458-1017.jpg"

    },
    {
        question: 'What\'s the capital of Sweden?',
        choices: ['Stockholm',
            'Malmö',
            'Gothenburg',
            'Kiruna'
        ],
        answer: 1,
        imageURL: "https://ak.picdn.net/shutterstock/videos/9763607/thumb/11.jpg"

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
    // Hide Image . Show Question
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

    // added index variable for the answers
    var AnswerIndex = 0;
    choices.forEach(choice => {

        const number = choice.dataset['number'];
        // take the question at the index
        choice.querySelector(".choice-text").innerText = currentQuestion.choices[AnswerIndex];
        AnswerIndex++;
    });
    // This will stop showing the same questions again
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};


showImage = () => {
    // Hide Question . Show Image
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

        // added -1 because of array starts at 0
        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        /*
  This will add background color to the choices depends on users answer
  if correct background will be green 
  if incorrect backgroud will be red
 */

        if (classToApply === 'correct') {
            incrementScore(correctBonus);
        }



        selectedChoice.classList.add(classToApply);

        // This will wait 1 second to apply created classes below
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply)
            if (classToApply === 'incorrect') {
                showImage();
            }
            setTimeout(() => {
                getNewQuestion();

            }, 1000)

        }, 800)
    });

})

// This will increment the users score when they answer correct
function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
};


startGame();