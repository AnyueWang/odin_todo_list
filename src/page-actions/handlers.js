const cancelAddProject = event => {
    event.preventDefault()
    document.querySelector('.project-new').remove()
}
const cancelAddTodo = event => {
    event.preventDefault()
    document.querySelector('.task-new').remove()
}

module.exports = {
    cancelAddProject,
    cancelAddTodo,
}