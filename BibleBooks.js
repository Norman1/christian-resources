class BibleBook {
    constructor(name, wordCount) {
        this.name = name;
        this.wordCount = wordCount;
    }
}


function displayBibleBookNames() {
    // Find the container for the list or create one
    let listContainer = document.getElementById("bookList");
    if (!listContainer) {
        listContainer = document.createElement("ul");
        listContainer.id = "bookList";
        document.getElementById("reading-plan").appendChild(listContainer);
    }

    // Clear any existing list items
    listContainer.innerHTML = "";

    const shuffledBooks = shuffleArray(bibleBooks);

    // Add each book name as a list item
    shuffledBooks.forEach(book => {
        const listItem = document.createElement("li");
        listItem.textContent = book.name;
        listContainer.appendChild(listItem);
    });
}

// Function to shuffle an array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}


const bibleBooks = [
    new BibleBook("Genesis", 32046, false),
    new BibleBook("Exodus", 25957, false),
    new BibleBook("Leviticus", 18852, false),
    new BibleBook("Numbers", 25048, false),
    new BibleBook("Deuteronomy", 23008, false),
    new BibleBook("Joshua", 15671, false),
    new BibleBook("Judges", 15385, false),
    new BibleBook("Ruth", 2042, false),
    new BibleBook("1 Samuel", 25048, false),
    new BibleBook("2 Samuel", 17170, false),
    new BibleBook("1 Kings", 24513, false),
    new BibleBook("2 Kings", 23517, false),
    new BibleBook("1 Chronicles", 16664, false),
    new BibleBook("2 Chronicles", 21349, false),
    new BibleBook("Ezra", 7440, false),
    new BibleBook("Nehemiah", 10480, false),
    new BibleBook("Esther", 5633, false),
    new BibleBook("Job", 12674, false),
    new BibleBook("Psalms", 30147, false),
    new BibleBook("Proverbs", 9921, false),
    new BibleBook("Ecclesiastes", 4537, false),
    new BibleBook("Song of Solomon", 2658, false),
    new BibleBook("Isaiah", 25608, false),
    new BibleBook("Jeremiah", 33002, false),
    new BibleBook("Lamentations", 3411, false),
    new BibleBook("Ezekiel", 29918, false),
    new BibleBook("Daniel", 9001, false),
    new BibleBook("Hosea", 3615, false),
    new BibleBook("Joel", 1477, false),
    new BibleBook("Amos", 3027, false),
    new BibleBook("Obadiah", 669, false),
    new BibleBook("Jonah", 1320, false),
    new BibleBook("Micah", 3152, false),
    new BibleBook("Nahum", 1284, false),
    new BibleBook("Habakkuk", 1475, false),
    new BibleBook("Zephaniah", 1141, false),
    new BibleBook("Haggai", 926, false),
    new BibleBook("Zechariah", 4855, false),
    new BibleBook("Malachi", 1320, false),
    new BibleBook("Matthew", 18346, true),
    new BibleBook("Mark", 11304, true),
    new BibleBook("Luke", 19482, true),
    new BibleBook("John", 15635, true),
    new BibleBook("Acts", 18450, true),
    new BibleBook("Romans", 7111, true),
    new BibleBook("1 Corinthians", 6830, true),
    new BibleBook("2 Corinthians", 4477, true),
    new BibleBook("Galatians", 2230, true),
    new BibleBook("Ephesians", 2422, true),
    new BibleBook("Philippians", 1629, true),
    new BibleBook("Colossians", 1582, true),
    new BibleBook("1 Thessalonians", 1481, true),
    new BibleBook("2 Thessalonians", 823, true),
    new BibleBook("1 Timothy", 1591, true),
    new BibleBook("2 Timothy", 1238, true),
    new BibleBook("Titus", 659, true),
    new BibleBook("Philemon", 335, true),
    new BibleBook("Hebrews", 4953, true),
    new BibleBook("James", 1742, true),
    new BibleBook("1 Peter", 1684, true),
    new BibleBook("2 Peter", 1099, true),
    new BibleBook("1 John", 2141, true),
    new BibleBook("2 John", 245, true),
    new BibleBook("3 John", 219, true),
    new BibleBook("Jude", 461, true),
    new BibleBook("Revelation", 9851, true)
];
