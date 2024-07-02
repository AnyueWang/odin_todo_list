const addNewProject = (project) => {
    const existedProjects = JSON.parse(localStorage.getItem('project'))
    if (existedProjects === null) {
        localStorage.setItem('project', JSON.stringify([project]))
    } else {
        const updatedProjects = existedProjects.concat(project)
        localStorage.setItem('project', JSON.stringify(updatedProjects))
    }
}
const getProjects = () => {
    const projects = localStorage.getItem('project')
    return projects === null
        ? []
        : JSON.parse(projects)
}
const addNewTodo = (todo) => {
    const existedTodos = JSON.parse(localStorage.getItem('todo'))
    if (existedTodos === null) {
        localStorage.setItem('todo', JSON.stringify([todo]))
    } else {
        const updatedTodos = existedTodos.concat(todo)
        localStorage.setItem('todo', JSON.stringify(updatedTodos))
    }
}
const getTodos = () => {
    const todos = localStorage.getItem('todo')
    return todos === null 
    ? []
    : JSON.parse(todos)
}
const updateTodo = (todo) => {
    const existedTodos = JSON.parse(localStorage.getItem('todo'))
    const id = todo.id
    const todosRemoveOld = existedTodos.filter(e=>e.id!==id)
    const updatedTodos = todosRemoveOld.concat(todo)
    localStorage.setItem('todo', JSON.stringify(updatedTodos))
}
const toggleDone = (todo) => {
    const existedTodos = JSON.parse(localStorage.getItem('todo'))
    const id = todo.id
    const targetTodo = existedTodos.find(e=>e.id===id)
    targetTodo.isDone = !targetTodo.isDone
    localStorage.setItem('todo', JSON.stringify(existedTodos))
}

module.exports = {
    addNewProject,
    getProjects,
    addNewTodo,
    getTodos,
    updateTodo,
    toggleDone
}