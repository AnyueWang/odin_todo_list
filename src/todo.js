const createTodo = (title, dueDate, description = '', priority = 0, isDone = false, checklist = []) => {
    const id = Date.now()
    const todo = {
        id,
        title,
        dueDate,
        description,
        priority,
        isDone,
        checklist,
    }
    return todo
}

module.exports = {
    createTodo,
}