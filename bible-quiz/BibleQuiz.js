let questions = [];
let remainingQuestions = [];
let filteredQuestions = [];
let currentQuestion = null; // Track the current question

// Function to load questions from the JSON file
async function loadQuestions() {
    const response = await fetch('./bible-quiz/bible-quiz.json');
    const data = await response.json();
    questions = data.questions;
    remainingQuestions = [...questions]; // Initially, all questions are available
}


async function applyFilter() {
    if (remainingQuestions.length === 0 && questions.length === 0) {
        await loadQuestions(); // Ensure questions are loaded
    }
    const bookFilterInput = document.getElementById('book-filter').value;
    const books = bookFilterInput.split(';').map(book => book.trim().toLowerCase());

    // Filter questions where at least one of the specified books matches
    console.log(questions);
    console.log(remainingQuestions);
    filteredQuestions = questions.filter(question =>
        question.books.some(book => books.includes(book.toLowerCase()))
    );

    // Update the remaining questions to use the filtered list
    remainingQuestions = [...filteredQuestions];

    // Clear the current question
    currentQuestion = null;

    // Provide feedback to the user
    const feedbackElement = document.getElementById('feedback');
    if (remainingQuestions.length > 0) {
        feedbackElement.textContent = `Filter applied. ${remainingQuestions.length} questions available.`;
        feedbackElement.style.color = "blue";
    } else {
        feedbackElement.textContent = "No questions match the selected filter. Resetting to all questions.";
        feedbackElement.style.color = "red";

        // Reset remaining questions to all questions
        remainingQuestions = [...questions];
    }
}


// Function to get a random question without repetition
function getNextQuestion() {
    if (remainingQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
        const question = remainingQuestions.splice(randomIndex, 1)[0]; // Remove and return the question
        return question;
    } else {
        return null; // No more questions
    }
}

// Function to display the next question and its options
async function displayNextQuestion() {
    if (remainingQuestions.length === 0 && questions.length === 0) {
        await loadQuestions(); // Ensure questions are loaded
    }

    currentQuestion = getNextQuestion(); // Update the current question
    const questionElement = document.getElementById('question');
    const optionsForm = document.getElementById('options-form');
    const feedbackElement = document.getElementById('feedback');

    if (currentQuestion) {
        questionElement.textContent = currentQuestion.question;
        feedbackElement.textContent = ""; // Clear feedback

        // Clear previous options
        optionsForm.innerHTML = "";

        // Render options as checkboxes or radio buttons
        currentQuestion.options.forEach((option, index) => {
            const input = document.createElement('input');
            const label = document.createElement('label');

            input.type = currentQuestion.type === "multiple" ? "checkbox" : "radio";
            input.name = "answer";
            input.value = option;
            input.id = `option-${index}`;

            label.htmlFor = `option-${index}`;
            label.textContent = option;

            optionsForm.appendChild(input);
            optionsForm.appendChild(label);
            optionsForm.appendChild(document.createElement('br')); // Line break
        });
    } else {
        questionElement.textContent = 'No more questions!';
        optionsForm.innerHTML = ""; // Clear options
        feedbackElement.textContent = ""; // Clear feedback
    }
}

// Function to handle answer submission
function submitAnswer() {
    if (!currentQuestion) {
        alert("No question to answer!");
        return;
    }

    const optionsForm = document.getElementById('options-form');
    const feedbackElement = document.getElementById('feedback');
    const selectedOptions = Array.from(optionsForm.elements)
        .filter(input => input.checked)
        .map(input => input.value);

    // Validate the answer
    const correctAnswers = currentQuestion.answer;
    if (
        correctAnswers.length === selectedOptions.length &&
        correctAnswers.every(answer => selectedOptions.includes(answer))
    ) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green"; // Set feedback color to green
    } else {
        feedbackElement.textContent = "Wrong Answer.";
        feedbackElement.style.color = "red"; // Set feedback color to red
    }
}
