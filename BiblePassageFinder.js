let hidden = true; // Global variable to control visibility

let currentPassage = {
    book: null,
    chapter: null,
    verses: []
};

function showSolution() {
    hidden = false;
    updateShowSolutionButton();

    // Fetch the current passage data and update the HTML content
    fetch('./web.json')
        .then(response => response.json())
        .then(data => {
            const versesInChapter = data.verses.filter(verse =>
                verse.book === currentPassage.book &&
                verse.chapter === currentPassage.chapter &&
                currentPassage.verses.includes(verse.verse)
            );
            updateHtmlContent(versesInChapter);
        });
}

function nextPassage() {
    hidden = true;
    updateShowSolutionButton(); // Update the button state
    const increaseRangeButton = document.getElementById("increaseRange");
    increaseRangeButton.disabled = false;


    fetch('./web.json')
        .then(response => response.json())
        .then(data => {
            const randomBookAndChapter = getRandomBibleBookAndChapter();

            // Find all verses of the selected book and chapter
            const versesInChapter = data.verses.filter(verse =>
                verse.book === randomBookAndChapter.number &&
                verse.chapter === randomBookAndChapter.chapter
            );

            // Select a random verse from the filtered verses
            const randomVerse = versesInChapter[Math.floor(Math.random() * versesInChapter.length)];

            // Save the current passage in the global variable
            currentPassage.book = randomBookAndChapter.number;
            currentPassage.chapter = randomBookAndChapter.chapter;
            currentPassage.verses = [randomVerse.verse];

            // Get or create the dedicated container
            const gameSection = document.getElementById("game");
            let verseContainer = document.getElementById("verseContainer");
            if (!verseContainer) {
                verseContainer = document.createElement("div");
                verseContainer.id = "verseContainer";
                gameSection.appendChild(verseContainer);
            }

            updateHtmlContent([randomVerse]);
        });

}

function increaseRange() {
    fetch('./web.json')
        .then(response => response.json())
        .then(data => {
            const versesInChapter = data.verses.filter(verse =>
                verse.book === currentPassage.book &&
                verse.chapter === currentPassage.chapter
            );

            // Get the current range
            const maxVerse = Math.min(Math.max(...currentPassage.verses) + 1, versesInChapter.length);

            if (maxVerse > Math.max(...currentPassage.verses)) {
                // Add the next verse at the end
                currentPassage.verses.push(maxVerse);
            } else {
                // Add the previous verse at the start
                const minVerse = Math.max(1, Math.min(...currentPassage.verses) - 1);
                currentPassage.verses.unshift(minVerse);
            }

            // Get the selected verses
            const selectedVerses = versesInChapter.filter(verse =>
                currentPassage.verses.includes(verse.verse)
            );

            // Update the container content with the selected verses
            const gameSection = document.getElementById("game");
            let verseContainer = document.getElementById("verseContainer");
            if (!verseContainer) {
                verseContainer = document.createElement("div");
                verseContainer.id = "verseContainer";
                gameSection.appendChild(verseContainer);
            }

            updateHtmlContent(selectedVerses);
        });
}

function updateHtmlContent(verses) {
    const gameSection = document.getElementById("game");
    let verseContainer = document.getElementById("verseContainer");
    if (!verseContainer) {
        verseContainer = document.createElement("div");
        verseContainer.id = "verseContainer";
        gameSection.appendChild(verseContainer);
    }

// Add content for the book title
    let bookPlaceholder = document.getElementById("bookPlaceholder");
    if (!bookPlaceholder) {
        bookPlaceholder = document.createElement("div");
        bookPlaceholder.id = "bookPlaceholder";
        bookPlaceholder.className = "book-placeholder";
        gameSection.insertBefore(bookPlaceholder, verseContainer);
    }
    bookPlaceholder.innerHTML = hidden ? "?" : verses[0]?.book_name || "";

// Update the verses content
    verseContainer.innerHTML = verses.map(verse => `
    <div class="verse-container">
        ${hidden ? "?" : `${verse.chapter}:${verse.verse}`} - ${verse.text}
    </div>
`).join('');

}

function getRandomBibleBookAndChapter() {
    const selectedBooks = Array.from(document.querySelectorAll("input[name='selectedBooks']:checked"))
        .map(checkbox => parseInt(checkbox.value));

    const bibleBooks = getBibleBooks().filter(book => selectedBooks.includes(book.number));

    if (bibleBooks.length === 0) {
        throw new Error("No Bible books selected");
    }

    const randomBookIndex = Math.floor(Math.random() * bibleBooks.length);
    const randomBook = bibleBooks[randomBookIndex];
    const randomChapter = Math.floor(Math.random() * randomBook.chapters) + 1;

    return {
        number: randomBook.number,
        name: randomBook.name,
        chapter: randomChapter
    };
}

function getBibleBooks() {
    return [
        {number: 1, name: "Genesis", chapters: 50},
        {number: 2, name: "Exodus", chapters: 40},
        {number: 3, name: "Leviticus", chapters: 27},
        {number: 4, name: "Numbers", chapters: 36},
        {number: 5, name: "Deuteronomy", chapters: 34},
        {number: 6, name: "Joshua", chapters: 24},
        {number: 7, name: "Judges", chapters: 21},
        {number: 8, name: "Ruth", chapters: 4},
        {number: 9, name: "1 Samuel", chapters: 31},
        {number: 10, name: "2 Samuel", chapters: 24},
        {number: 11, name: "1 Kings", chapters: 22},
        {number: 12, name: "2 Kings", chapters: 25},
        {number: 13, name: "1 Chronicles", chapters: 29},
        {number: 14, name: "2 Chronicles", chapters: 36},
        {number: 15, name: "Ezra", chapters: 10},
        {number: 16, name: "Nehemiah", chapters: 13},
        {number: 17, name: "Esther", chapters: 10},
        {number: 18, name: "Job", chapters: 42},
        {number: 19, name: "Psalms", chapters: 150},
        {number: 20, name: "Proverbs", chapters: 31},
        {number: 21, name: "Ecclesiastes", chapters: 12},
        {number: 22, name: "Song of Solomon", chapters: 8},
        {number: 23, name: "Isaiah", chapters: 66},
        {number: 24, name: "Jeremiah", chapters: 52},
        {number: 25, name: "Lamentations", chapters: 5},
        {number: 26, name: "Ezekiel", chapters: 48},
        {number: 27, name: "Daniel", chapters: 12},
        {number: 28, name: "Hosea", chapters: 14},
        {number: 29, name: "Joel", chapters: 3},
        {number: 30, name: "Amos", chapters: 9},
        {number: 31, name: "Obadiah", chapters: 1},
        {number: 32, name: "Jonah", chapters: 4},
        {number: 33, name: "Micah", chapters: 7},
        {number: 34, name: "Nahum", chapters: 3},
        {number: 35, name: "Habakkuk", chapters: 3},
        {number: 36, name: "Zephaniah", chapters: 3},
        {number: 37, name: "Haggai", chapters: 2},
        {number: 38, name: "Zechariah", chapters: 14},
        {number: 39, name: "Malachi", chapters: 4},
        {number: 40, name: "Matthew", chapters: 28},
        {number: 41, name: "Mark", chapters: 16},
        {number: 42, name: "Luke", chapters: 24},
        {number: 43, name: "John", chapters: 21},
        {number: 44, name: "Acts", chapters: 28},
        {number: 45, name: "Romans", chapters: 16},
        {number: 46, name: "1 Corinthians", chapters: 16},
        {number: 47, name: "2 Corinthians", chapters: 13},
        {number: 48, name: "Galatians", chapters: 6},
        {number: 49, name: "Ephesians", chapters: 6},
        {number: 50, name: "Philippians", chapters: 4},
        {number: 51, name: "Colossians", chapters: 4},
        {number: 52, name: "1 Thessalonians", chapters: 5},
        {number: 53, name: "2 Thessalonians", chapters: 3},
        {number: 54, name: "1 Timothy", chapters: 6},
        {number: 55, name: "2 Timothy", chapters: 4},
        {number: 56, name: "Titus", chapters: 3},
        {number: 57, name: "Philemon", chapters: 1},
        {number: 58, name: "Hebrews", chapters: 13},
        {number: 59, name: "James", chapters: 5},
        {number: 60, name: "1 Peter", chapters: 5},
        {number: 61, name: "2 Peter", chapters: 3},
        {number: 62, name: "1 John", chapters: 5},
        {number: 63, name: "2 John", chapters: 1},
        {number: 64, name: "3 John", chapters: 1},
        {number: 65, name: "Jude", chapters: 1},
        {number: 66, name: "Revelation", chapters: 22}
    ];
}

function updateShowSolutionButton() {
    const showSolutionButton = document.getElementById("showSolution");
    showSolutionButton.disabled = !hidden;
}


document.addEventListener("DOMContentLoaded", () => {

    const showSolutionButton = document.getElementById("showSolution");
    const increaseRangeButton = document.getElementById("increaseRange");

    // Initially disable the buttons
    showSolutionButton.disabled = true;
    increaseRangeButton.disabled = true;

    // Add event listeners to the buttons
    document.getElementById("showSolution").addEventListener("click", showSolution);
    document.getElementById("nextPassage").addEventListener("click", nextPassage);
    document.getElementById("increaseRange").addEventListener("click", increaseRange);

    // Dynamically generate checkboxes for Bible books
    const bibleBooks = getBibleBooks(); // Reuse your existing function
    const bookListDiv = document.getElementById("bookList");

    if (bookListDiv) { // Ensure the element exists
        // Create the "Select All" checkbox
        const selectAllContainer = document.createElement("div");
        selectAllContainer.className = "checkbox-container";

        const selectAllCheckbox = document.createElement("input");
        selectAllCheckbox.type = "checkbox";
        selectAllCheckbox.id = "select-all";
        selectAllCheckbox.checked = true; // Default to checked

        const selectAllLabel = document.createElement("label");
        selectAllLabel.htmlFor = "select-all";
        selectAllLabel.textContent = "Select All";

        selectAllContainer.appendChild(selectAllCheckbox);
        selectAllContainer.appendChild(selectAllLabel);
        bookListDiv.appendChild(selectAllContainer);

        // Add event listener to "Select All" checkbox
        selectAllCheckbox.addEventListener("change", (event) => {
            const checkboxes = bookListDiv.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach(checkbox => {
                checkbox.checked = event.target.checked;
            });
        });

        // Create checkboxes for each Bible book
        bibleBooks.forEach(book => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `book-${book.number}`;
            checkbox.name = "selectedBooks";
            checkbox.value = book.number;
            checkbox.checked = true; // Default to checked

            const label = document.createElement("label");
            label.htmlFor = `book-${book.number}`;
            label.textContent = book.name;

            const container = document.createElement("div");
            container.className = "checkbox-container"; // Add class for styling
            container.appendChild(checkbox);
            container.appendChild(label);

            bookListDiv.appendChild(container);
        });
    } else {
        console.error("Element with ID 'bookList' not found!");
    }
});
