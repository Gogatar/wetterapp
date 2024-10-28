const openWeatherKey = 'DEIN_OPENWEATHER_API_KEY';

// Standort abrufen und Wetterinformationen anzeigen
navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Standort anzeigen
    document.getElementById('location').textContent = `Breitengrad: ${lat.toFixed(2)}, Längengrad: ${lon.toFixed(2)}`;

    try {
        // Wetterdaten abrufen
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=${openWeatherKey}`);
        const weatherData = await weatherResponse.json();
        
        // Wetter und Windgeschwindigkeit anzeigen
        document.getElementById('temperature').textContent = `${Math.round(weatherData.main.temp)}°C`;
        document.getElementById('weather').textContent = weatherData.weather[0].description;
        document.getElementById('windSpeed').textContent = weatherData.wind.speed;
    } catch (error) {
        console.error("Fehler beim Abrufen der Wetterdaten:", error);
        document.getElementById('weather').textContent = "Fehler beim Laden der Wetterdaten";
    }
});
