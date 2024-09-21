// Array of question objects for the quiz
const questions = [
    {
        question: 'What is the speed of light?',
        a: 'About 286,282 miles per second',
        b: 'Approximately 186,282 kilometers per second',
        c: 'About 299,792 miles per second',
        d: 'Approximately 299,792 kilometers per second', // Correct answer
        correct: 'd'
    },
    {
        question: 'What does "HTTP" stand for in web addresses?',
        a: 'HyperText Transfer Platform',
        b: 'HyperText Translation Protocol',
        c: 'Hypertext Transfer Protocol', // Correct answer
        d: 'High-Tech Transmission Protocol',
        correct: 'c'
    },
    {
        question: 'What does "USB" stand for?',
        a: 'Universal Service Bus',
        b: 'Universal Serial Bus', // Correct answer
        c: 'Unified Serial Bridge',
        d: 'Ultra Speed Bandwidth',
        correct: 'b'
    },
    {
        question: "Who is known as the, father of computing?",
        a: 'Charles Babbage', // Correct answer
        b: 'John von Neumann',
        c: 'Ada Lovelace',
        d: 'Thomas Edison',
        correct: 'a'
    },
    {
        question: 'What is the largest planet in our solar system?',
        a: 'Saturn',
        b: 'Jupiter', // Correct answer
        c: 'Earth',
        d: 'Mars',
        correct: 'b'
    },
    {
        question: 'Who wrote the first programming language?',
        a: 'Charles Babbage',
        b: 'Ada Lovelace', // Correct answer
        c: 'Grace Hopper',
        d: 'Alan Turing',
        correct: 'b'
    },
    {
        question: 'How many satellites are in the sky right now?',
        a: 'Approximately 3,50',
        b: 'Approximately 3,5000',
        c: 'Approximately 3,500', // Correct answer
        d: 'Approximately 3,50000',
        correct: 'c'
    },
    {
        question: 'What type of energy is stored in a battery?',
        a: 'Chemical energy', // Correct answer
        b: 'Kinetic energy',
        c: 'Solar energy',
        d: 'Thermal energy',
        correct: 'a'
    },
    {
        question: 'What force keeps us grounded on Earth?',
        a: 'Gravity', // Correct answer
        b: 'Theory of relativity',
        c: 'Centrifugal force',
        d: 'Frictional force',
        correct: 'a'
    },
    {
        question: 'If you drop a yellow hat in the Red Sea, what does it become?',
        a: 'Wet, the color of the hat doesn’t change', // Correct answer
        b: 'A blue hat',
        c: 'A red hat',
        d: 'None of above',
        correct: 'a'
    }
];

const quizContainer = document.querySelector('.quiz');
const answersEls = document.querySelectorAll('.answer');
const questionEl = document.querySelector('.quiz__question');
const a_text = document.querySelector('.a_text');
const b_text = document.querySelector('.b_text');
const c_text = document.querySelector('.c_text');
const d_text = document.querySelector('.d_text');
const submitBtn = document.querySelector('.quiz__submit');
const timerEl = document.getElementById('timer'); // Timer element

let currentQuiz = 0;
let answer = undefined;
let score = 0;
let timer; // Timer variable
const totalQuizTime = 180; // Total time for the quiz in seconds (e.g., 5 minutes)
let startTime; // To track when the quiz starts

showQuiz();
startTimer(); // Start the total quiz timer on load

function showQuiz() {
    deselectAnswers();
    const currentQuizData = questions[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function startTimer() {
    startTime = Date.now(); // Capture the start time
    let timeLeft = totalQuizTime;
    timerEl.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! You have finished the quiz.');
            showScore();
        }
    }, 1000);
}

function goToNextQuestion() {
    currentQuiz++;
    if (currentQuiz < questions.length) {
        showQuiz();
    } else {
        showScore();
    }
}

function getSelected() {
    answersEls.forEach(answersEl => {
        if (answersEl.checked) {
            answer = answersEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answersEls.forEach(answersEl => {
        answersEl.checked = false;
    });
}

submitBtn.addEventListener('click', function () {
    answer = getSelected();

    if (answer) {
        if (answer === questions[currentQuiz].correct) {
            score++;
        }
        goToNextQuestion();
    } else {
        alert('Please select an answer before submitting.');
    }
});

function showScore() {
    clearInterval(timer); // Stop the timer when showing score
    const endTime = Date.now(); // Capture the end time
    const totalTimeTaken = Math.floor((endTime - startTime) / 1000); // Calculate time taken in seconds

    quizContainer.innerHTML = `
        <h2 class="quiz__question quiz__question--score">
        Congratulations! You've completed the quiz. Your Score is ${score}/${questions.length}<br>
        Total Time Taken: ${totalTimeTaken} seconds
        </h2>
        <button onclick="location.reload()" class="quiz__submit">Start Again</button>
    `;
}