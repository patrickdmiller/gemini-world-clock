console.log('Hello from main.js!!');

document.addEventListener('DOMContentLoaded', () => {
    const cityNameElement = document.getElementById('city-name');
    const timeElement = document.getElementById('time');
    const clockContainer = document.getElementById('clock-container'); // Get the container

    const cities = [
        { name: 'New York', timezone: 'America/New_York' },
        { name: 'London', timezone: 'Europe/London' },
        { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    ];

    let currentCityIndex = 0;
    let intervalId = null;
    let isAnimating = false; // Flag to prevent multiple animation triggers

    function updateTimeContent() { // Renamed from updateTime to avoid confusion
        try {
            const city = cities[currentCityIndex];
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                timeZone: city.timezone,
                hour12: false, // Use 24-hour format
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            cityNameElement.textContent = city.name;
            timeElement.textContent = timeString;
        } catch (error) {
            console.error("Error fetching time:", error);
            cityNameElement.textContent = 'Error';
            timeElement.textContent = '--:--:--';
            if (intervalId) clearInterval(intervalId); // Stop updates on error
        }
    }

    function changeCity(direction) {
        if (isAnimating) return; // Don't change city if already animating
        isAnimating = true;

        if (intervalId) clearInterval(intervalId); // Clear interval during animation

        clockContainer.classList.add('slide-out-3d');

        function onSlideOutEnd() {
            clockContainer.removeEventListener('animationend', onSlideOutEnd);
            clockContainer.classList.remove('slide-out-3d');

            // Update city index and content
            currentCityIndex = (currentCityIndex + direction + cities.length) % cities.length;
            updateTimeContent(); // Update the text content

            // Trigger slide in
            clockContainer.classList.add('slide-in-3d');
            clockContainer.addEventListener('animationend', onSlideInEnd);
        }

        function onSlideInEnd() {
            clockContainer.removeEventListener('animationend', onSlideInEnd);
            clockContainer.classList.remove('slide-in-3d');
            isAnimating = false;
            // Restart interval for the new city
            intervalId = setInterval(updateTimeContent, 1000);
        }

        clockContainer.addEventListener('animationend', onSlideOutEnd);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            changeCity(-1); // Previous city
        } else if (event.key === 'ArrowRight') {
            changeCity(1); // Next city
        }
    });

    // Initial load
    updateTimeContent(); // Initial content update
    intervalId = setInterval(updateTimeContent, 1000); // Start interval
});

const Engine = Matter.Engine;
const Render = Matter.Render;