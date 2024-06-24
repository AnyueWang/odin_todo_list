const data = require('../data/data')
const projects = require('../controllers/projects')
const todos = require('../controllers/todos')

const dataProjects = data.projects
const dataTodos = data.todos

dataProjects.forEach(
    eachProject => {
        projects.addNewProject(eachProject.title, eachProject.description)
    }
)
dataTodos.forEach(
    eachTodo => {
        const dateStrs = eachTodo.date.split('-')
        const dueDate = new Date(dateStrs[2], dateStrs[1]-1, dateStrs[0])
        const relatedProject = projects.getProjectByName(eachTodo.project)
        todos.addNewTodo(eachTodo.title, dueDate, relatedProject, eachTodo.description, eachTodo.priority, eachTodo.isDone, eachTodo.checklist)
    }
)

const getProjects = () => projects.getProjectList()
const getTodos = () => todos.getTodoList()
const defaultProject = () => projects.defaultProject
const getProjectByName = name => projects.getProjectByName(name)
const getTodoById = id => todos.getTodoById(id)
const getTodosByProject = project => todos.getTodosByProject(project)

module.exports = {
    getProjects,
    getTodos,
    defaultProject,
    getProjectByName,
    getTodoById,
    getTodosByProject,
}

