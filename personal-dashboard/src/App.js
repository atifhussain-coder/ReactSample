// src/App.js
import React, { useState } from 'react';
import './styles.css';
import WeatherModel from './models/WeatherModel';
import TodoModel from './models/TodoModel';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import TodoList from './components/TodoList/TodoList';


const App = () => {
    const [location, setLocation] = useState('');
    const [weatherModel, setWeatherModel] = useState(new WeatherModel());
    const [todoModel, setTodoModel] = useState(new TodoModel());

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleAddTask = (newTaskText) => {
        setTodoModel(prevTodoModel => {
            const updatedTasks = [...prevTodoModel.tasks]; // Create a copy of existing tasks
            updatedTasks.push({ id: Date.now(), text: newTaskText, completed: false }); // Add new task
            return { ...prevTodoModel, tasks: updatedTasks }; // Update the tasks in todoModel
        });
    };

    const handleTaskChange = (id) => {
        setTodoModel(prevTodoModel => {
            const updatedTodoModel = new TodoModel(); // Create a new instance of TodoModel
            updatedTodoModel.tasks = prevTodoModel.tasks.map(task => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed }; // Toggle completion status
                }
                return task;
            });
            return updatedTodoModel;
        });
    };

    const handleTaskDelete = (id) => {
        setTodoModel(prevTodoModel => {
            const updatedTodoModel = new TodoModel(); // Create a new instance of TodoModel
            updatedTodoModel.tasks = prevTodoModel.tasks.filter(task => task.id !== id); // Delete the task
            return updatedTodoModel;
        });
    };

    const refreshWeather = async () => {
        try {
            let locationToFetch = location || 'karachi';
            let weatherObj = new WeatherModel(); // Change weatherModel to WeatherModel
            const weatherData = await weatherObj.fetchWeather(locationToFetch);
            setWeatherModel(prevWeatherModel => ({
                ...prevWeatherModel,
                weatherData: weatherData
            }));
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="heading">Personal Dashboard</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Enter location (city/country)"
                    value={location}
                    onChange={handleLocationChange}
                    className="input-field"
                />
                <button
                    onClick={refreshWeather}
                    className="button"
                >
                    Refresh Weather
                </button>
            </div>
            {weatherModel && (
                <WeatherDisplay weather={weatherModel.weatherData} />
            )}
            <TodoList
                tasks={todoModel.tasks}
                handleTaskChange={handleTaskChange}
                handleTaskDelete={handleTaskDelete}
                handleAddTask={handleAddTask}
            />
        </div>
    );
};

export default App;
