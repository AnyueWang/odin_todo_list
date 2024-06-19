const todo = require('../models/todo')

let todoList = []

const getTodoList = () => todoList

const addTodo = (todo) => todoList.push(todo)

const addNewTodo = (title, dueDate, project, description, priority, isDone, checklist) => {
    const newTodo = todo.createTodo(title, dueDate, project, description, priority, isDone, checklist)
    addTodo(newTodo)
    return newTodo
}

const getTodosInProject = (project) => {
    return todoList.filter(eachTodo => eachTodo.project.title === project.title)
}

const deleteTodo = (todo) => {
    todoList = todoList.filter(eachTodo => eachTodo.id !== todo.id)
}

module.exports = {
    getTodoList,
    addNewTodo,
    getTodosInProject,
    deleteTodo,
}