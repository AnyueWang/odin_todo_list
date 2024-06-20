const todos = require('./controllers/todos')
const projects = require('./controllers/projects')
require('./styles.css')
const {compareAsc, format} = require('date-fns')

todos.addNewTodo('Shopping for food',
    new Date(2030, 5, 2),
    projects.defaultProject,
)

todos.addNewTodo('Cinema',
    new Date(2030, 5, 3),
    projects.defaultProject,
    "go for a date",
    7
)

todos.addNewTodo('Dance class',
    new Date(2030, 5, 9),
    projects.defaultProject,
    "Learning something new",
    3
)

const newProject = projects.addNewProject('Weekend', 'must-do activities for this weekend')

console.log(projects.addNewProject('Weekend'))

const todoList = todos.getTodoList()

todoList[0].changeProject(newProject)
todoList[1].changeProject(newProject)

console.log(todos.getTodoList())
console.log(projects.getProjectList())

console.log(todos.getTodosInProject(newProject))

todos.deleteTodo(todoList[0])
console.log(todos.getTodoList())

const ulProjects = document.querySelector("#project-list")
const ulTodos = document.querySelector("#todo-list")

projects.getProjectList().forEach(eachProject => {
    const newLi = document.createElement("li")
    const newAnchor = document.createElement('a')
    newAnchor.textContent = `${eachProject.title}`
    newAnchor.classList.add('project-nav')
    newLi.appendChild(newAnchor)
    ulProjects.appendChild(newLi)
})

todos.getTodoList().forEach(eachTodo => {
    const newLi = document.createElement("li")
    const newAnchor = document.createElement('div')
    const title = document.createElement('div')
    const date = document.createElement('div')
    title.textContent = eachTodo.title
    date.textContent = format(eachTodo.dueDate, 'dd-MMM-yyyy')
    newAnchor.appendChild(title)
    newAnchor.appendChild(date)
    newAnchor.classList.add('task-nav')
    newLi.appendChild(newAnchor)
    ulTodos.appendChild(newLi)
})