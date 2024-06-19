const createTodo = (title, dueDate, project, description = '', priority = 0, isDone = false, checklist = []) => {
    const id = Date.now()
    project.addTodo(id)

    const isOverdue = () => {
        return dueDate < new Date() 
    }

    return {
        id,
        title,
        dueDate,
        description,
        priority,
        isDone,
        checklist,

        isOverdue,
        
    }
}

module.exports = {
    createTodo,
}