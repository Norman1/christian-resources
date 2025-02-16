// Initialize the map
const map = L.map('map').setView([31.5, 35], 7); // Centered near Israel

L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
}).addTo(map);

// Create a LayerGroup for markers
const markersGroup = L.layerGroup().addTo(map);

// Variables for game logic
let currentTarget = null; // Holds the current target location
let locations = []; // All locations
let availableLocations = []; // Remaining locations

// Fetch GeoJSON data
fetch('./biblical-locations/biblicalLocations.json')
    .then(response => response.json())
    .then(data => {
        locations = data.features; // Store all locations
        availableLocations = [...locations]; // Copy all locations to availableLocations
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

// Handle "Next Location" button click
document.getElementById('nextLocation').addEventListener('click', () => {
    if (availableLocations.length === 0) {
        alert('All locations have been used! Restarting...');
        availableLocations = [...locations]; // Reset available locations
    }

    // Clear all markers
    markersGroup.clearLayers();

    // Pick a random location from availableLocations
    const randomIndex = Math.floor(Math.random() * availableLocations.length);
    currentTarget = availableLocations[randomIndex];

    // Remove the selected location from availableLocations
    availableLocations.splice(randomIndex, 1);

    // Show the location name in the HTML
    document.getElementById('currentLocation').innerText = `Find: ${currentTarget.properties.name}`;
});

// Handle user clicks on the map
map.on('click', function (e) {
    if (!currentTarget) {
        alert('Click "Next Location" to start!');
        return;
    }

    const userLatLng = [e.latlng.lat, e.latlng.lng];
    const targetCoords = currentTarget.geometry.coordinates;

    // Add marker for the user's guess
    L.marker(userLatLng).addTo(markersGroup)
        .bindPopup(`<b>Your Guess:</b><br>Lat: ${userLatLng[0].toFixed(4)}, Lng: ${userLatLng[1].toFixed(4)}`)
        .openPopup();

    // Add marker for the actual location
    L.marker([targetCoords[1], targetCoords[0]])
        .addTo(markersGroup)
        .bindPopup(`<b>Actual Location:</b> ${currentTarget.properties.name}`)
        .openPopup();

    // Reset current target
    currentTarget = null;
    document.getElementById('currentLocation').innerText = 'Click "Next Location" to start again!';
});
