import React from 'react';

const WeatherDisplay = ({ weather }) => {
    // Check if the weather object exists and contains the expected properties
    if (!weather || !weather.name || !weather.sys || !weather.weather || !weather.main) {
        return (
            <div className="mb-8 mb-2">
                <h4>No weather data available</h4>
            </div>
        );
    }

    // Destructure the weather object to access its properties
    const { name, sys, weather: weatherInfo, main } = weather;

    // Check if weatherInfo array exists and contains at least one element
    const weatherDescription = weatherInfo && weatherInfo.length > 0 ? weatherInfo[0].description : 'Unknown';

    return (
        <div className="mb-8">
            <h2 className="text-xl mb-2">{name}, {sys.country}</h2>
            <p>{weatherDescription}</p>
            <p>Temperature: {main.temp}°C</p>
        </div>
    );
};

export default WeatherDisplay;