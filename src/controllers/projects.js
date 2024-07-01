const project = require('../models/project')

const defaultTitle = 'Default'
const defaultProject = project.createProject(defaultTitle, "All tasks are shown here.")
const projectList = [defaultProject]

const getProjectList = () => projectList
const getProjectByName = (name) => {
    return projectList.find(each => {
        return each.title === name
    }) || defaultProject
}
const isTitleExist = (title) => {
    return projectList.map(eachProject => eachProject.title).includes(title)
}

const addProject = (project) => projectList.push(project)

const addNewProject = (title, description) => {
    if (isTitleExist(title)) return false
    const newProject = project.createProject(title, description)
    addProject(newProject)
    return newProject
}

const deleteProject = (project) => {
    if (project.title === defaultTitle) return false
    projectList = projectList.filter(eachProject => eachProject.title !== project.title)
}

module.exports = {
    defaultProject,

    getProjectList,
    addNewProject,
    deleteProject,
    getProjectByName,
    isTitleExist,
}


