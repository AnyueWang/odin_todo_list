const closeExpandedTask = () => {
    const expandedTask = document.querySelector('.task-nav-expanded')
    if (expandedTask) {
        expandedTask.classList.remove('task-nav-expanded')
        const deletedDetails = expandedTask.nextElementSibling
        deletedDetails.remove()
    }
}

module.exports = {
    closeExpandedTask
}