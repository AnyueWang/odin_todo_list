const createTodo = (title, dueDate, project, description = '', priority = 0, isDone = false, checklist = []) => {
    const id = Date.now()
    project.addTodo(id)
    return {
        id,
        title,
        dueDate,
        description,
        priority,
        isDone,
        checklist,
    }
}

module.exports = {
    createTodo,
}