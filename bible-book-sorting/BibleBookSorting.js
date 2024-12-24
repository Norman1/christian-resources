const bibleBooks = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel",
    "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther",
    "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
    "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans",
    "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians",
    "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter",
    "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];


let selectedBook;
let remainingBooks = [...bibleBooks];

function getRandomBook() {
    if (remainingBooks.length === 0) {
        console.warn("All books have been selected.");
        return null;
    }
    const randomIndex = Math.floor(Math.random() * remainingBooks.length);
    selectedBook = remainingBooks.splice(randomIndex, 1)[0]; // Remove the selected book from remainingBooks
    updateSelectedBookDisplay(selectedBook);
    clearInputsAndFeedback();
    updateInputStates();
    return selectedBook;
}

function updateSelectedBookDisplay(book) {
    const displayElement = document.getElementById('selectedBookDisplay');
    if (displayElement) {
        displayElement.textContent = book || "None";
    }
}

function clearInputsAndFeedback() {
    const previousBookInput = document.getElementById('previousBookInput');
    const nextBookInput = document.getElementById('nextBookInput');
    const previousFeedback = document.getElementById('previousBookInputFeedback');
    const nextFeedback = document.getElementById('nextBookInputFeedback');

    if (previousBookInput) previousBookInput.value = "";
    if (nextBookInput) nextBookInput.value = "";
    if (previousFeedback) previousFeedback.textContent = "";
    if (nextFeedback) nextFeedback.textContent = "";
}

function updateInputStates() {
    const previousBookInput = document.getElementById('previousBookInput');
    const nextBookInput = document.getElementById('nextBookInput');

    if (!selectedBook) {
        if (previousBookInput) previousBookInput.disabled = true;
        if (nextBookInput) nextBookInput.disabled = true;
        return;
    }

    const selectedIndex = bibleBooks.indexOf(selectedBook);

    if (previousBookInput) {
        previousBookInput.disabled = selectedIndex <= 0; // Disable if first book
    }

    if (nextBookInput) {
        nextBookInput.disabled = selectedIndex >= bibleBooks.length - 1; // Disable if last book
    }
}


function getNeighboringBook(offset) {
    if (!selectedBook) {
        return null;
    }

    const index = bibleBooks.indexOf(selectedBook);
    if (index === -1) {
        return null;
    }

    const neighborIndex = index + offset;
    return bibleBooks[neighborIndex] || null;
}

function validateInput(inputId, expectedBook) {
    const inputElement = document.getElementById(inputId);
    const feedbackElement = document.getElementById(`${inputId}Feedback`);

    if (inputElement && feedbackElement) {
        const inputValue = inputElement.value.trim().toLowerCase();
        const expectedValue = expectedBook.toLowerCase();
        feedbackElement.textContent = inputValue === expectedValue ? "OK" : "Wrong Book";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const nextBookButton = document.getElementById('nextBookButton');
    if (nextBookButton) {
        nextBookButton.addEventListener('click', getRandomBook);
    }

    // Add event listeners to input fields for real-time validation
    const previousBookInput = document.getElementById('previousBookInput');
    const nextBookInput = document.getElementById('nextBookInput');

    if (previousBookInput) {
        previousBookInput.addEventListener('input', () => {
            validateInput('previousBookInput', getNeighboringBook(-1));
        });
    }

    if (nextBookInput) {
        nextBookInput.addEventListener('input', () => {
            validateInput('nextBookInput', getNeighboringBook(1));
        });
    }
    updateInputStates(); // Initial state update
});

