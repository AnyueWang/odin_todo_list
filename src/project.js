const createProject = (title, description = '', todos = []) => {
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