const todo = require('./models/todo')
const project = require('./models/project')
const todos = require('./controllers/todos')
const projects = require('./controllers/projects')

const defaultProject = project.createProject('Default')

projects.addProject(defaultProject)

const itemTodo = todo.createTodo(
    'Shopping for food',
    new Date(2030, 5, 2),
    defaultProject
)

todos.addTodo(itemTodo)



console.log(todos.showTodoList())
console.log(projects.showProjectList())
