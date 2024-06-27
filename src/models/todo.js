const createTodo = (title, dueDate, project, description = '', priority = 1, isDone = false, checklist = []) => {
    const id = Math.floor(new Date().valueOf() * Math.random()).toString()

    const isOverdue = () => {
        return dueDate < new Date()
    }
    const changeProject = function (newProject) {
        this.project = newProject
    }

    return {
        id,
        title,
        dueDate,
        project,
        description,
        priority,
        isDone,
        checklist,

        isOverdue,
        changeProject,

    }
}

module.exports = {
    createTodo,
}