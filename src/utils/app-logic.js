const local = require('../data/local')
const projects = require('../controllers/projects')
const todos = require('../controllers/todos')

const dataProjects = local.getProjects()
const dataTodos = local.getTodos()

dataProjects.forEach(
    eachProject => {
        projects.addNewProject(eachProject.title, eachProject.description)
    }
)
dataTodos.forEach(
    eachTodo => {
        const dueDate = new Date(eachTodo.dueDate)
        const relatedProject = projects.getProjectByName(eachTodo.project.title)
        todos.addNewTodo(eachTodo.title, dueDate, relatedProject, eachTodo.description, eachTodo.priority, eachTodo.isDone, eachTodo.id)
    }
)

const getProjects = () => projects.getProjectList()
const getTodos = () => todos.getTodoList()
const defaultProject = () => projects.defaultProject
const getProjectByName = name => projects.getProjectByName(name)
const getTodoById = id => todos.getTodoById(id)
const getTodosByProject = project => todos.getTodosByProject(project)
const addNewProject = (title, description) => {
    projects.addNewProject(title, description)
    local.addNewProject({ title, description })
}
const isTitleExist = title => projects.isTitleExist(title)
const addNewTodo = (title, dueDate, project, description, priority, isDone, id) => {
    const newTodo = todos.addNewTodo(title, dueDate, project, description, priority, isDone, id)
    const objectForStore = {
        id: newTodo.id,
        title: newTodo.title,
        dueDate: newTodo.dueDate,
        project: newTodo.project,
        description: newTodo.description,
        priority: newTodo.priority,
        isDone: newTodo.isDone
    }
    local.addNewTodo(objectForStore)
}
const deleteTodo = todo => todos.deleteTodo(todo)
const updateTodo = (id, title, dueDate, project, description, priority) => {
    const updatedTodo = todos.updateTodo(id, title, dueDate, project, description, priority)
    const objectForStore = {
        id: updatedTodo.id,
        title: updatedTodo.title,
        dueDate: updatedTodo.dueDate,
        project: updatedTodo.project,
        description: updatedTodo.description,
        priority: updatedTodo.priority,
        isDone: updatedTodo.isDone
    }
    local.updateTodo(objectForStore)
}
const toggleDone = todo => {
    todo.toggleDone()
    local.toggleDone(todo)
}

module.exports = {
    getProjects,
    getTodos,
    defaultProject,
    getProjectByName,
    getTodoById,
    getTodosByProject,
    addNewProject,
    isTitleExist,
    addNewTodo,
    deleteTodo,
    updateTodo,
    toggleDone,
}

