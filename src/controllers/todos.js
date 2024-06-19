const todo = require('../models/todo')

const todoList = []

const getTodoList = () => todoList

const addTodo = (todo) => todoList.push(todo)

const addNewTodo = (title, dueDate, project, description, priority, isDone, checklist) => {
    const newTodo = todo.createTodo(title, dueDate, project, description, priority, isDone, checklist)
    addTodo(newTodo)
}

module.exports = {
    getTodoList,
    addNewTodo,

}