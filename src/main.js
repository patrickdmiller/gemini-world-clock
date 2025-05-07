console.log('Hello from main.js!!');

document.addEventListener('DOMContentLoaded', () => {
    const cityNameElement = document.getElementById('city-name');
    const timeElement = document.getElementById('time');

    const cities = [
        { name: 'New York', timezone: 'America/New_York' },
        { name: 'London', timezone: 'Europe/London' },
        { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    ];

    let currentCityIndex = 0;
    let intervalId = null;

    function updateTime() {
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
        currentCityIndex = (currentCityIndex + direction + cities.length) % cities.length;
        updateTime(); // Update immediately on change
        // Restart interval
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(updateTime, 1000);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            changeCity(-1); // Previous city
        } else if (event.key === 'ArrowRight') {
            changeCity(1); // Next city
        }
    });

    // Initial load
    updateTime();
    intervalId = setInterval(updateTime, 1000);
});

const Engine = Matter.Engine;
const Render = Matter.Render;