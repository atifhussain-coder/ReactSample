class TodoModel {
    constructor() {
        this.tasks = [];
    }

    addTask(taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        this.tasks.push(newTask);
        return [...this.tasks];
    }

    toggleTaskCompletion(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}

export default TodoModel;
