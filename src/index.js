const todo = require('./models/todo')
const todos = require('./controllers/todos')
const projects = require('./controllers/projects')

const itemTodo = todo.createTodo(
    'Shopping for food',
    new Date(2030, 5, 2),
    projects.getDefaultProject(),
)

todos.addTodo(itemTodo)



console.log(todos.showTodoList())
console.log(projects.showProjectList())
