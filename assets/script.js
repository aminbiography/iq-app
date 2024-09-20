// Array of question objects for the quiz
const questions = [
    {
        question: 'Bangladesh\'s Independence day is:', // Question text
        a: '16 December', // Option a
        b: '21 February', // Option b
        c: '25 March',    // Option c
        d: '26 March',    // Option d (correct answer)
        correct: 'd'      // Key indicating the correct answer
    },
    {
        question: 'Which is the capital of Bangladesh?',
        a: 'Dhaka Metropolitan',
        b: 'Dhaka City Corporation',
        c: 'Dhaka',       // Correct answer
        d: 'Jahangirnagear',
        correct: 'c'
    },
    {
        question: 'Which is the biggest division of Bangladesh',
        a: 'Dhaka',
        b: 'Chattogram',  // Correct answer
        c: 'Rajshahi',
        d: 'Barishal',
        correct: 'b'
    },
    {
        question: "Bangladesh\'s flag has:",
        a: 'Two colors',  // Correct answer
        b: 'Three colors',
        c: 'Four colors',
        d: 'One color',
        correct: 'a'
    },
    {
        question: 'Bangladesh\'s National anthem was wrote by?',
        a: 'Kazi Nazrul Islam',
        b: 'Rabindranath Tagore', // Correct answer
        c: 'Jasimuddin',
        d: 'Jibanananda Das',
        correct: 'b'
    }
]

// Selecting elements from the DOM (HTML document) using querySelector
const quizContainer = document.querySelector('.quiz') // The main quiz container
const answersEls = document.querySelectorAll('.answer') // All answer radio buttons
const questionEl = document.querySelector('.quiz__question') // The element for displaying the question
const a_text = document.querySelector('.a_text') // The label for option 'a'
const b_text = document.querySelector('.b_text') // The label for option 'b'
const c_text = document.querySelector('.c_text') // The label for option 'c'
const d_text = document.querySelector('.d_text') // The label for option 'd'
const submitBtn = document.querySelector('.quiz__submit') // The submit button for answering the question

// The element to display informational messages (if added)
const infoMsg = document.querySelector('.info') // (Optional, not used in current code)

// Track the current quiz question index
let currentQuiz = 0

// Function to display the current question and its options
showQuiz();

function showQuiz() {
    // Deselects any previously selected answer (clears radio button selections)
    deselectAnswers();

    // Load the data for the current question
    const currentQuizData = questions[currentQuiz]

    // Update the HTML with the current question and answer options
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

let answer = undefined // To store the currently selected answer
let score = 0 // Variable to keep track of the user's score

// Function to get the selected answer
function getSelected() {
    // Loop through all the answer elements (radio buttons)
    answersEls.forEach(answersEl => {
        // If the radio button is checked, assign its id to 'answer'
        if (answersEl.checked) {
            answer = answersEl.id
        }
    })
    // Return the selected answer id
    return answer
}

// Function to clear any selected answers (uncheck all radio buttons)
function deselectAnswers() {
    answersEls.forEach(answersEl => {
        answersEl.checked = false
    })
}

// Event listener for the submit button
submitBtn.addEventListener('click', function () {

    // Get the user's selected answer
    answer = getSelected()

    // If an answer was selected
    if (answer) {

        // Check if the selected answer is correct
        if (answer === questions[currentQuiz].correct) {
            score++ // Increment score if the answer is correct
        }

        currentQuiz++ // Move to the next question
        
        // If there are more questions to display
        if (currentQuiz < questions.length) {
            showQuiz() // Load the next question
        } else {
            // When all questions are answered, display the final score
            quizContainer.innerHTML = `
                <h2 class="quiz__question quiz__question--score">
                Congratulation! Finished. Your Score is ${score}/5
                </h2>

                <button onclick="location.reload()" class="quiz__submit">Start Again</button>
            `
           // The score is shown, and the quiz offers a restart option
        }

    }
})
