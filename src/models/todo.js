const createTodo = (title, dueDate, project, description = '', priority = 1, isDone = false, assignedId = undefined) => {
    const id = assignedId
        ? assignedId
        : Math.floor(new Date().valueOf() * Math.random()).toString()

    const isOverdue = () => {
        return dueDate < new Date()
    }
    const changeProject = function (newProject) {
        this.project = newProject
    }

    const toggleDone = function () {
        this.isDone = !this.isDone
    }
    const update = function (newTitle, newDueDate, newProject, newDescription, newPriority) {
        this.title = newTitle
        this.dueDate = newDueDate
        this.project = newProject
        this.description = newDescription
        this.priority = newPriority
    }

    return {
        id,
        title,
        dueDate,
        project,
        description,
        priority,
        isDone,

        isOverdue,
        changeProject,
        toggleDone,
        update,
    }
}

module.exports = {
    createTodo,
}