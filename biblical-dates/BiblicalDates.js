let biblicalDates = [];
let pickedEvents = []; // To track already picked events
let currentEvent = null; // Store the current event for comparison

fetch('./biblical-dates/biblical-dates.json')
    .then(response => response.json())
    .then(data => {
        biblicalDates = data;
        console.log("Biblical dates loaded:", biblicalDates);
    })
    .catch(error => console.error("Error loading the JSON file:", error));

function pickRandomEvent() {
    if (biblicalDates.length === 0) {
        console.error("The biblical dates data has not been loaded yet.");
        return null;
    }

    if (pickedEvents.length === biblicalDates.length) {
        console.warn("All events have been picked.");
        return null; // Optional: Reset pickedEvents if you want replayability
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * biblicalDates.length);
    } while (pickedEvents.includes(randomIndex));

    pickedEvents.push(randomIndex);
    return biblicalDates[randomIndex];
}

// HTML Integration
function showNextEvent() {
    currentEvent = pickRandomEvent();
    if (currentEvent) {
        document.getElementById('eventDescription').textContent = currentEvent.description;
    } else {
        document.getElementById('eventDescription').textContent = "No more events available.";
    }

    // Clear the user input and feedback
    document.getElementById('userDateInput').value = "";
    document.getElementById('resultMessage').textContent = "";
}

// Function to check user's date guess
function checkDateGuess(userGuess, event) {
    if (!event) {
        console.error("No event provided to check against.");
        return "No event selected to compare.";
    }

    const correctDate = event.year;
    const difference = Math.abs(userGuess - correctDate);

    if (userGuess === correctDate) {
        return "Your provided date is correct.";
    } else {
        return `Your provided date is ${userGuess}, which is ${difference} years off from the actual date of ${correctDate}.`;
    }
}

// Function to handle checking the date
function handleCheckDate() {
    const userGuess = parseInt(document.getElementById('userDateInput').value, 10);
    if (isNaN(userGuess)) {
        document.getElementById('resultMessage').textContent = "Please enter a valid number.";
        return;
    }

    if (!currentEvent) {
        document.getElementById('resultMessage').textContent = "No event selected. Click 'Next Event' first.";
        return;
    }

    const result = checkDateGuess(userGuess, currentEvent);
    document.getElementById('resultMessage').textContent = result;
}
