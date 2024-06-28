const closeExpandedTask = () => {
    const expandedTask = document.querySelector('.task-nav-expanded, .task-done-nav-expanded')
    if (expandedTask) {
        expandedTask.classList.remove('task-nav-expanded')
        expandedTask.classList.remove('task-done-nav-expanded')
        const deletedDetails = expandedTask.nextElementSibling
        deletedDetails.remove()
    }
}

module.exports = {
    closeExpandedTask
}