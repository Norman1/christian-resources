class BibleBook {
    constructor(name, wordCount) {
        this.name = name;
        this.wordCount = wordCount;
    }



}

const bibleBooks = [
    new BibleBook("Genesis", 32046),
    new BibleBook("Exodus", 25957),
    new BibleBook("Leviticus", 18852),
    new BibleBook("Numbers", 25048),
    new BibleBook("Deuteronomy", 23008),
    new BibleBook("Joshua", 15671),
    new BibleBook("Judges", 15385),
    new BibleBook("Ruth", 2042),
    new BibleBook("1 Samuel", 25048),
    new BibleBook("2 Samuel", 17170),
    new BibleBook("1 Kings", 24513),
    new BibleBook("2 Kings", 23517),
    new BibleBook("1 Chronicles", 16664),
    new BibleBook("2 Chronicles", 21349),
    new BibleBook("Ezra", 7440),
    new BibleBook("Nehemiah", 10480),
    new BibleBook("Esther", 5633),
    new BibleBook("Job", 12674),
    new BibleBook("Psalms", 30147),
    new BibleBook("Proverbs", 9921),
    new BibleBook("Ecclesiastes", 4537),
    new BibleBook("Song of Solomon", 2658),
    new BibleBook("Isaiah", 25608),
    new BibleBook("Jeremiah", 33002),
    new BibleBook("Lamentations", 3411),
    new BibleBook("Ezekiel", 29918),
    new BibleBook("Daniel", 9001),
    new BibleBook("Hosea", 3615),
    new BibleBook("Joel", 1477),
    new BibleBook("Amos", 3027),
    new BibleBook("Obadiah", 669),
    new BibleBook("Jonah", 1320),
    new BibleBook("Micah", 3152),
    new BibleBook("Nahum", 1284),
    new BibleBook("Habakkuk", 1475),
    new BibleBook("Zephaniah", 1141),
    new BibleBook("Haggai", 926),
    new BibleBook("Zechariah", 4855),
    new BibleBook("Malachi", 1320),
    new BibleBook("Matthew", 18346),
    new BibleBook("Mark", 11304),
    new BibleBook("Luke", 19482),
    new BibleBook("John", 15635),
    new BibleBook("Acts", 18450),
    new BibleBook("Romans", 7111),
    new BibleBook("1 Corinthians", 6830),
    new BibleBook("2 Corinthians", 4477),
    new BibleBook("Galatians", 2230),
    new BibleBook("Ephesians", 2422),
    new BibleBook("Philippians", 1629),
    new BibleBook("Colossians", 1582),
    new BibleBook("1 Thessalonians", 1481),
    new BibleBook("2 Thessalonians", 823),
    new BibleBook("1 Timothy", 1591),
    new BibleBook("2 Timothy", 1238),
    new BibleBook("Titus", 659),
    new BibleBook("Philemon", 335),
    new BibleBook("Hebrews", 4953),
    new BibleBook("James", 1742),
    new BibleBook("1 Peter", 1684),
    new BibleBook("2 Peter", 1099),
    new BibleBook("1 John", 2141),
    new BibleBook("2 John", 245),
    new BibleBook("3 John", 219),
    new BibleBook("Jude", 461),
    new BibleBook("Revelation", 9851)
];

// Example usage
bibleBooks.forEach(book => console.log(book.displayInfo()));

