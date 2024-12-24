let currentBook = null;
const shownBooks = new Set();

function nextBook() {
    const titleElement = document.getElementById('titleDisplay');
    if (titleElement) {
        titleElement.textContent = '';
    }

    const titleInput = document.getElementById('titleInput');
    if (titleInput) {
        titleInput.value = ''; // Clear the text input field
    }

    const validationResult = document.getElementById('validationResult');
    if (validationResult) {
        validationResult.textContent = ''; // Clear the validation result
    }

    fetch('/find-the-book/book-descriptions.json')
        .then(response => response.json())
        .then(bibleBooks => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * bibleBooks.length);
                currentBook = bibleBooks[randomIndex];
            } while (shownBooks.has(currentBook.name) && shownBooks.size < bibleBooks.length);

            if (shownBooks.size >= bibleBooks.length) {
                console.log('All books have been shown.');
                return;
            }

            shownBooks.add(currentBook.name);

            const descriptionElement = document.getElementById('descriptionDisplay');
            if (descriptionElement) {
                descriptionElement.textContent = currentBook.description;
            } else {
                console.error('No element found with ID descriptionDisplay');
            }
        })
        .catch(error => {
            console.error('Error fetching or processing book-descriptions.json:', error);
        });
}

function showTitle() {
    if (currentBook) {
        const titleElement = document.getElementById('titleDisplay');
        if (titleElement) {
            titleElement.textContent = currentBook.name;
        } else {
            console.error('No element found with ID titleDisplay');
        }
    } else {
        console.error('No book has been selected yet. Please pick a book first.');
    }
}

function validateTitle() {
    const userInput = document.getElementById('titleInput').value.trim();
    const validationResult = document.getElementById('validationResult');

    if (currentBook) {
        if (userInput.toLowerCase() === currentBook.name.toLowerCase()) {
            validationResult.textContent = 'OK';
        } else {
            validationResult.textContent = 'Wrong Title';
        }
    } else {
        validationResult.textContent = 'No book has been selected yet. Please pick a book first.';
    }
}

document.getElementById('titleInput').addEventListener('input', validateTitle);