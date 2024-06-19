const project = require('../models/project')

const defaultProject = project.createProject('Default')
const projectList = [defaultProject]

const getProjectList = () => projectList

const addProject = (project) => projectList.push(project)

const getDefaultProject = () => defaultProject

const addNewProject = (title, description) => {
    const newProject = project.createProject(title, description)
    addProject(newProject)
}

module.exports = {
    getProjectList,
    addProject,
    getDefaultProject,
    addNewProject,
}