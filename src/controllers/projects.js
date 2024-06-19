const project = require('../models/project')

const defaultProject = project.createProject('Default')
const projectList = [defaultProject]

const getProjectList = () => projectList

const addProject = (project) => projectList.push(project)

const addNewProject = (title, description) => {
    const titles = projectList.map(eachProject => eachProject.title)
    if (titles.includes(title)) return false
    const newProject = project.createProject(title, description)
    addProject(newProject)
    return newProject
}

module.exports = {
    defaultProject,

    getProjectList,
    addNewProject,
}