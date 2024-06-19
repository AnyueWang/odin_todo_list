const todos = require('./controllers/todos')
const projects = require('./controllers/projects')

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