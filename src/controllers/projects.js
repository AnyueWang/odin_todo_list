const project = require('../models/project')

const defaultProject = project.createProject('Default')
const projectList = [defaultProject]

const showProjectList = () => projectList

const addProject = (project) => projectList.push(project)

const getDefaultProject = () => defaultProject

module.exports = {
    showProjectList,
    addProject,
    getDefaultProject,
}