const todo = require('./todo')
const project = require('./project')

const defaultProject = project.createProject('Default')

const itemTodo = todo.createTodo(
    'Shopping for food',
    new Date(2030, 5, 2),
)

defaultProject.addTodo(itemTodo)

console.log(itemTodo)
console.log(defaultProject)