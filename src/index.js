const todos = require('./controllers/todos')
const projects = require('./controllers/projects')
require('./styles.css')
const { compareAsc, format } = require('date-fns')

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
    const newBtn = document.createElement('div')
    const title = document.createElement('div')
    const date = document.createElement('div')
    title.textContent = eachTodo.title
    date.textContent = format(eachTodo.dueDate, 'dd-MMM-yyyy')
    newBtn.appendChild(title)
    newBtn.appendChild(date)
    newBtn.classList.add('task-nav')
    newBtn.setAttribute("id", `${eachTodo.id}`)
    newLi.appendChild(newBtn)
    ulTodos.appendChild(newLi)
})

const todoBtns = document.querySelectorAll('.task-nav')

todoBtns.forEach(eachBtn => {
    eachBtn.addEventListener('click', () => {
        if (eachBtn.classList.contains('task-nav-expanded')) {
            eachBtn.classList.remove('task-nav-expanded')
            const deletedDetails = eachBtn.nextElementSibling
            deletedDetails.remove()
        } else {
            eachBtn.classList.add('task-nav-expanded')
            const id = eachBtn.getAttribute('id')
            const todo = todos.findTodo(id)
            const collapse = document.createElement('div')
            collapse.classList.add('task-details')

            const titleProject = document.createElement('p')
            titleProject.textContent = `Project:`
            collapse.appendChild(titleProject)
            const detailProject = document.createElement('p')
            detailProject.textContent = todo.project.title
            collapse.appendChild(detailProject)
            const titleDescription = document.createElement('p')
            titleDescription.textContent = `Description:`
            collapse.appendChild(titleDescription)
            const detailDescription = document.createElement('p')
            detailDescription.textContent = todo.description
            collapse.appendChild(detailDescription)
            const titlePriority = document.createElement('p')
            titlePriority.textContent = `Priority:`
            collapse.appendChild(titlePriority)
            const detailPriority = document.createElement('p')
            detailPriority.textContent = todo.priority
            collapse.appendChild(detailPriority)
            const titleChecklist = document.createElement('p')
            titleChecklist.textContent = `Checklist:`
            collapse.appendChild(titleChecklist)
            const detailChecklist = document.createElement('p')
            detailChecklist.textContent = todo.checkList || '(none)'
            collapse.appendChild(detailChecklist)

            eachBtn.parentElement.appendChild(collapse)
        }
    })
}, true)