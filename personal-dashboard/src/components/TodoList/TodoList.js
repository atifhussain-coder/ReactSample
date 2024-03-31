import React, { useState } from 'react';

const TodoList = ({ tasks, handleTaskChange, handleTaskDelete, handleAddTask }) => {
    const [newTaskText, setNewTaskText] = useState('');

    const handleInputChange = (e) => {
        setNewTaskText(e.target.value);
    };

    const handleAddButtonClick = () => {
        if (newTaskText.trim() !== '') {
            handleAddTask(newTaskText);
            setNewTaskText(''); // Clear the input field after adding task
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl mb-4">Todo List</h2>
            <div className="flex items-center mb-4">
                <textarea
                    type="text"
                    maxLength={100}
                    placeholder="Add a new task"
                    value={newTaskText}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 mr-2  input-field"
                />
                <button
                    onClick={handleAddButtonClick}
                    className="button btn-style"
                >
                    Add Task
                </button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="flex items-center list-space">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleTaskChange(task.id)}
                            className="mr-2 input-field"
                        />
                        <span className={task.completed ? 'line-through' : ''}>{task.text} </span>
                        <button
                            onClick={() => handleTaskDelete(task.id)}
                            className="button"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
