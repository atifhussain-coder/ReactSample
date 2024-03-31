class WeatherModel {
    constructor() {
        this.weatherData = null;
        this.weatherDataError = "Please enter the valid location";
        this.API_KEY = '2d415b445b899e563eaa340b5f309bc6'; // todo: hide key in env.
    }

    async fetchWeather(location) {
        try {
            this.weatherData = null
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.API_KEY}&units=metric`);
            if (response.status != 404) {
                this.weatherDataError = null;
                const data = await response.json();
                this.weatherData = data;
                return this.weatherData;
            } else {
                this.weatherDataError = "Please enter the valid location";
            }
            return this;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return error;
        }
    }
}

export default WeatherModel;
