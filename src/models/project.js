const createProject = (title, description = '') => {
    const todos = []

    const addTodo = (todo) => {
        todos.push(todo)
    }

    return {
        title,
        description,
        todos,

        addTodo,
    }
}

module.exports = {
    createProject,
}