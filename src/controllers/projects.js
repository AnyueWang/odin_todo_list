const project = require('../models/project')

const defaultProject = project.createProject('Default')
const projectList = [defaultProject]

const getProjectList = () => projectList

const addProject = (project) => projectList.push(project)

const getDefaultProject = () => defaultProject

module.exports = {
    getProjectList,
    addProject,
    getDefaultProject,
}