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

// Selecting elements from the DOM
const quizContainer = document.querySelector('.quiz'); // The main quiz container
const answersEls = document.querySelectorAll('.answer'); // All answer radio buttons
const questionEl = document.querySelector('.quiz__question'); // The element for displaying the question
const a_text = document.querySelector('.a_text'); // The label for option 'a'
const b_text = document.querySelector('.b_text'); // The label for option 'b'
const c_text = document.querySelector('.c_text'); // The label for option 'c'
const d_text = document.querySelector('.d_text'); // The label for option 'd'
const submitBtn = document.querySelector('.quiz__submit'); // The submit button for answering the question

// Track the current quiz question index
let currentQuiz = 0;

// Function to display the current question and its options
showQuiz();

function showQuiz() {
    // Deselect any previously selected answer
    deselectAnswers();

    // Load the data for the current question
    const currentQuizData = questions[currentQuiz];

    // Update the HTML with the current question and answer options
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

let answer = undefined; // To store the currently selected answer
let score = 0; // Variable to keep track of the user's score

// Function to get the selected answer
function getSelected() {
    // Loop through all the answer elements (radio buttons)
    answersEls.forEach(answersEl => {
        // If the radio button is checked, assign its id to 'answer'
        if (answersEl.checked) {
            answer = answersEl.id;
        }
    });
    // Return the selected answer id
    return answer;
}

// Function to clear any selected answers (uncheck all radio buttons)
function deselectAnswers() {
    answersEls.forEach(answersEl => {
        answersEl.checked = false;
    });
}

// Event listener for the submit button
submitBtn.addEventListener('click', function () {

    // Get the user's selected answer
    answer = getSelected();

    // If an answer was selected
    if (answer) {

        // Check if the selected answer is correct
        if (answer === questions[currentQuiz].correct) {
            score++; // Increment score if the answer is correct
        }

        currentQuiz++; // Move to the next question
        
        // If there are more questions to display
        if (currentQuiz < questions.length) {
            showQuiz(); // Load the next question
        } else {
            // When all questions are answered, display the final score
            quizContainer.innerHTML = `
                <h2 class="quiz__question quiz__question--score">
                Congratulations! You've completed the quiz. Your Score is ${score}/${questions.length}
                </h2>

                <button onclick="location.reload()" class="quiz__submit">Start Again</button>
            `;
            // The score is shown, and the quiz offers a restart option
        }

    } else {
        // Optionally, you can display a message prompting the user to select an answer
        alert('Please select an answer before submitting.');
    }
});
