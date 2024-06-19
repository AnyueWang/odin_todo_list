const todo = require('./models/todo')
const project = require('./models/project')

const defaultProject = project.createProject('Default')

const itemTodo = todo.createTodo(
    'Shopping for food',
    new Date(2030, 5, 2),
    defaultProject
)

console.log(itemTodo)
console.log(defaultProject)
console.log(itemTodo.isOverdue())