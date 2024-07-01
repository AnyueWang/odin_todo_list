const todo = require('../models/todo')

let todoList = []

const getTodoList = () => todoList

const addTodo = (todo) => todoList.push(todo)

const addNewTodo = (title, dueDate, project, description, priority, isDone, checklist) => {
    const newTodo = todo.createTodo(title, dueDate, project, description, priority, isDone, checklist)
    addTodo(newTodo)
    return newTodo
}

const getTodosByProject = (project) => {
    if (project.title === 'Default') return todoList
    return todoList.filter(eachTodo => eachTodo.project === project)
}

const deleteTodo = (todo) => {
    todoList = todoList.filter(eachTodo => eachTodo.id !== todo.id)
}

const getTodoById = (id) => {
    return todoList.find(eachTodo => eachTodo.id === id)
}

module.exports = {
    getTodoList,
    addNewTodo,
    getTodosByProject,
    deleteTodo,
    getTodoById,
}