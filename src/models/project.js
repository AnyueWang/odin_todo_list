const createProject = (title, description = '') => {
    return {
        title,
        description,
    }
}

module.exports = {
    createProject,
}