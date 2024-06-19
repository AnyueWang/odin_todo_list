const projectList = []

const showProjectList = () => projectList

const addProject = (project) => projectList.push(project)

module.exports = {
    showProjectList,
    addProject,
    
}