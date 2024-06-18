const todo = require('./todo')

const itemTodo = todo.createTodo(
    'Shopping for food',
    new Date(2030, 5, 2),
)

console.log(itemTodo)