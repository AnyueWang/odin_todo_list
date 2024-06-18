const createTodo = (title, dueDate, description = '', priority = 0, project = undefined, isDone = false) => {
    return {
        title,
        dueDate,
        description,
        priority,
        project,
        isDone,
    }
}

module.exports = {
    createTodo,
}