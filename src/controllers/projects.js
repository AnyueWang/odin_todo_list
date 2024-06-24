const project = require('../models/project')

const allTitle = 'All'
const allProject = project.createProject(allTitle)
const defaultTitle = 'Default'
const defaultProject = project.createProject(defaultTitle)
const projectList = [allProject, defaultProject]

const getProjectList = () => projectList
const getProjectByName = (name) => {
    return projectList.find(each => {
        return each.title === name
    })
}

const addProject = (project) => projectList.push(project)

const addNewProject = (title, description) => {
    const titles = projectList.map(eachProject => eachProject.title)
    if (titles.includes(title)) return false
    const newProject = project.createProject(title, description)
    addProject(newProject)
    return newProject
}

const deleteProject = (project) => {
    if (project.title === defaultTitle || project.title === allTitle) return false
    projectList = projectList.filter(eachProject => eachProject.title !== project.title)
}

module.exports = {
    defaultProject,

    getProjectList,
    addNewProject,
    deleteProject,
    getProjectByName,
}