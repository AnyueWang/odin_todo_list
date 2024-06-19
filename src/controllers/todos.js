const todoList = []

const showTodoList = () => todoList

const addTodo = (todo) => todoList.push(todo)

module.exports = {
    showTodoList,
    addTodo,
    
}