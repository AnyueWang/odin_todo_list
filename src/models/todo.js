const createTodo = (title, dueDate, project, description = '', priority = 1, isDone = false, checklist = []) => {
    const id = Math.floor(new Date().valueOf() * Math.random()).toString()

    const isOverdue = () => {
        return dueDate < new Date()
    }
    const changeProject = function (newProject) {
        this.project = newProject
    }

    const toggleDone = function () {
        this.isDone = !this.isDone
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
        toggleDone,

    }
}

module.exports = {
    createTodo,
}