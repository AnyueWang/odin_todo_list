const warnings = require('../page-components/warnings')
const icons = require('../page-components/icons')
const resettings = require('../page-actions/resettings')
const { compareAsc, format } = require('date-fns')
const app = require('./app-logic')
const { defaultProject } = require('../controllers/projects')
const ulProjects = document.querySelector("#project-list")
const ulTodos = document.querySelector("#todo-list")
const h3ProjectDescription = document.querySelector('#project-description')
const projectTitle = document.querySelector(`#project-title`)
const taskTitle = document.querySelector(`#task-title`)

const priorities = {
    1: 'Lowest',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Highest'
}

const display = () => {

    const iconAddProject = icons.addIcon(icons.IconAddProject, projectTitle, 'Create a new project.')
    const iconAddTodo = icons.addIcon(icons.IconAddTodo, taskTitle, 'Create a new task')

    let targetProject = app.defaultProject()

    iconAddProject.addEventListener('click', () => {
        if (isEditing()) {
            return
        }
        const newLi = document.createElement('li')
        const newForm = document.createElement('form')
        newForm.classList.add('project-nav')

        const heading = document.createElement('p')
        heading.textContent = '🗃️ New project'
        heading.classList.add('heading-new')
        const titleLabel = document.createElement('label')
        titleLabel.setAttribute('for', 'new-project-title')
        titleLabel.textContent = 'Name: '
        const titleInput = document.createElement('input')
        titleInput.setAttribute('id', 'new-project-title')
        newForm.append(heading)
        newForm.appendChild(titleLabel)
        newForm.appendChild(titleInput)

        const descriptionLabel = document.createElement('label')
        descriptionLabel.setAttribute('for', 'new-project-description')
        descriptionLabel.textContent = 'Description: '
        const descriptionInput = document.createElement('textarea')
        descriptionInput.setAttribute('id', 'new-project-description')
        newForm.appendChild(descriptionLabel)
        newForm.appendChild(descriptionInput)

        const btnContainer = document.createElement('div')
        const addBtn = document.createElement('button')
        addBtn.textContent = 'Add'
        btnContainer.appendChild(addBtn)
        btnContainer.classList.add('new-buttons')

        const cancelBtn = document.createElement('button')
        cancelBtn.textContent = 'Cancel'
        btnContainer.appendChild(cancelBtn)
        btnContainer.classList.add('new-project-buttons')
        newForm.appendChild(btnContainer)

        newLi.appendChild(newForm)
        newLi.classList.add('project-new')
        ulProjects.prepend(newLi)

        addBtn.addEventListener('click', (event) => {
            event.preventDefault()
            const title = document.querySelector('#new-project-title').value
            const description = document.querySelector('#new-project-description').value
            if (app.isTitleExist(title)) {
                warnings.addWarningBefore(btnContainer, 'Project name already exists!')
                return
            }
            if (title === '') {
                warnings.addWarningBefore(btnContainer, 'Project name should not be empty!')
                return
            }
            app.addNewProject(title, description)
            document.querySelector('.project-new').remove()
            displayProjects()
        })

        cancelBtn.addEventListener('click', (event) => {
            event.preventDefault()
            document.querySelector('.project-new').remove()
        })
    })

    iconAddTodo.addEventListener('click', () => {
        if (isEditing()) {
            return
        }
        editTaskInfo()

        const addBtn = document.querySelector('.add-btn')
        const cancelBtn = document.querySelector('.cancel-btn')

        addBtn.addEventListener('click', (event) => {
            event.preventDefault()
            const title = document.querySelector('#new-task-title').value
            const dueDate = document.querySelector('#new-task-duedate').value
            const dueDateSplits = dueDate.split('-')
            const project = document.querySelector('#new-task-project').value
            const description = document.querySelector('#new-task-description').value
            const priority = document.querySelector('#new-task-priority').value
            if (title === '') {
                warnings.addWarningBefore(addBtn.parentElement, 'Task name should not be empty!')
                return
            }
            app.addNewTodo(
                title,
                new Date(dueDateSplits[0], dueDateSplits[1] - 1, dueDateSplits[2]),
                app.getProjectByName(project || 'Default'),
                description,
                Number(priority.split(' ')[0]) || 1,
            )
            displayRelatedTodos(targetProject)
        })

        cancelBtn.addEventListener('click', (event) => {
            event.preventDefault()
            document.querySelector('.task-new').remove()
        })
    })

    displayProjects()

    displayRelatedTodos(targetProject)

    function displayProjects() {
        ulProjects.replaceChildren()
        app.getProjects().forEach(eachProject => {
            const newLi = document.createElement("li")
            const newAnchor = document.createElement('a')
            newAnchor.textContent = `${eachProject.title}`
            newAnchor.classList.add('project-nav')
            newLi.appendChild(newAnchor)
            ulProjects.appendChild(newLi)
        })

        const projectBtns = document.querySelectorAll('.project-nav')
        projectBtns[0].classList.add('project-selected')
        h3ProjectDescription.textContent = targetProject.description

        projectBtns.forEach(eachBtn => {
            eachBtn.addEventListener('click', () => {
                if (isEditing()) {
                    return
                }
                targetProject = app.getProjectByName(eachBtn.textContent)
                displayRelatedTodos(targetProject)
                const siblings = [...eachBtn.parentElement.parentElement.children]
                siblings.forEach(eachChild => {
                    if (eachChild.firstChild.classList.contains('project-selected')) {
                        eachChild.firstChild.classList.remove('project-selected')
                    }
                })
                eachBtn.classList.add('project-selected')
                h3ProjectDescription.textContent = targetProject.description
            })
        })
    }

    function displayTargetTodo() {
        const todoBtns = document.querySelectorAll('.task-nav')

        todoBtns.forEach(eachBtn => {
            eachBtn.addEventListener('click', () => {
                if (isEditing()) {
                    return
                }
                if (eachBtn.classList.contains('task-nav-expanded') || eachBtn.classList.contains('task-done-nav-expanded')) {
                    eachBtn.classList.remove('task-nav-expanded')
                    eachBtn.classList.remove('task-done-nav-expanded')
                    eachBtn.nextSibling.remove()
                    return
                }

                resettings.closeExpandedTask()

                const id = eachBtn.getAttribute('id')
                const todo = app.getTodoById(id)
                const collapse = document.createElement('div')

                if (todo.isDone) {
                    eachBtn.classList.add('task-done-nav-expanded')
                    collapse.classList.add('task-done-details')
                } else {
                    eachBtn.classList.add('task-nav-expanded')
                    collapse.classList.add('task-details')
                }

                const titleProject = document.createElement('p')
                titleProject.textContent = `Project:`
                collapse.appendChild(titleProject)
                const detailProject = document.createElement('p')
                detailProject.textContent = todo.project ? todo.project.title : ''
                collapse.appendChild(detailProject)
                const titleDescription = document.createElement('p')
                titleDescription.textContent = `Description:`
                collapse.appendChild(titleDescription)
                const detailDescription = document.createElement('p')
                detailDescription.textContent = todo.description
                collapse.appendChild(detailDescription)
                const titlePriority = document.createElement('p')
                titlePriority.textContent = `Priority:`
                collapse.appendChild(titlePriority)
                const detailPriority = document.createElement('p')
                detailPriority.textContent = `${todo.priority} (${priorities[todo.priority]})`
                collapse.appendChild(detailPriority)
                eachBtn.parentElement.appendChild(collapse)

            })
        }, true)
    }

    function displayRelatedTodos(project) {
        ulTodos.replaceChildren()
        const todos = app.getTodosByProject(project)
        const todosOrderedByTime = todos.sort((a, b) => {
            if (a.isDone !== b.isDone) {
                return a.isDone - b.isDone
            } else {
                return compareAsc(a.dueDate, b.dueDate)
            }
        })
        todosOrderedByTime.forEach(eachTodo => {
            const newLi = document.createElement("li")
            const newBtn = document.createElement('div')
            const title = document.createElement('div')
            const date = document.createElement('div')
            const StatusIcon = eachTodo.isDone ? icons.IconDone : icons.IconUndone
            const statusTip = eachTodo.isDone ? 'The task is done. Press to set undone.' : 'The task is undone. Press to set done.'
            if (eachTodo.isDone) {
                newBtn.classList.add('task-done-nav')
            }
            const iconStatus = icons.addIcon(StatusIcon, title, statusTip)
            const iconEdit = icons.addIcon(icons.IconEdit, title, 'Edit the information of the task.')
            const iconDelete = icons.addIcon(icons.IconDelete, title, 'Delete the task.')
            const titleContent = document.createElement('p')
            titleContent.textContent = eachTodo.title
            title.appendChild(titleContent)
            date.textContent = format(eachTodo.dueDate, 'dd-MMM-yyyy')
            newBtn.appendChild(title)
            newBtn.appendChild(date)
            newBtn.classList.add('task-nav')
            newBtn.setAttribute("id", `${eachTodo.id}`)
            newLi.appendChild(newBtn)
            ulTodos.appendChild(newLi)

            iconDelete.addEventListener('click', event => {
                event.stopPropagation()
                const id = event.target.closest('.task-nav').id
                const deletedTodo = app.getTodoById(id)
                app.deleteTodo(deletedTodo)
                document.getElementById(id).parentElement.remove()
            })

            iconEdit.addEventListener('click', event => {
                event.stopPropagation()
                if (isEditing()) {
                    return
                }
                const id = event.target.closest('.task-nav').id
                const updatedTodo = app.getTodoById(id)
                editTaskInfo(id)

                const addBtn = document.querySelector('.add-btn')
                const cancelBtn = document.querySelector('.cancel-btn')

                addBtn.addEventListener('click', (event) => {
                    event.preventDefault()
                    const title = document.querySelector('#new-task-title').value
                    const dueDate = document.querySelector('#new-task-duedate').value
                    const dueDateSplits = dueDate.split('-')
                    const project = document.querySelector('#new-task-project').value
                    const description = document.querySelector('#new-task-description').value
                    const priority = document.querySelector('#new-task-priority').value
                    if (title === '') {
                        warnings.addWarningBefore(addBtn.parentElement, 'Task name should not be empty!')
                        return
                    }
                    app.updateTodo(
                        updatedTodo.id, 
                        title, 
                        new Date(dueDateSplits[0], dueDateSplits[1] - 1, dueDateSplits[2]), 
                        app.getProjectByName(project),
                        description,
                        Number(priority.split(' ')[0]) || 1,
                    )

                    displayRelatedTodos(targetProject)
                })

                cancelBtn.addEventListener('click', () => {
                    event.preventDefault()
                    const targetLi = document.querySelector('.task-new')
                    targetLi.classList.remove('task-new')
                    targetLi.firstElementChild.classList.remove('task-nav-expanded')
                    targetLi.lastElementChild.remove()
                    displayRelatedTodos(defaultProject)
                })
            })

            iconStatus.addEventListener('click', event => {
                event.stopPropagation()
                app.toggleDone(eachTodo)
                displayRelatedTodos(targetProject)
            })
        })
        displayTargetTodo()
    }
}

module.exports = {
    display,
}

function isEditing() {
    return document.querySelector('.project-new, .task-new')
}

const editTaskInfo = (id = undefined) => {

    resettings.closeExpandedTask()

    const newDetailsForm = document.createElement('form')
    const titleLabel = document.createElement('label')
    titleLabel.setAttribute('for', 'new-task-title')
    titleLabel.textContent = 'Name: '
    const titleInput = document.createElement('input')
    titleInput.setAttribute('id', 'new-task-title')
    newDetailsForm.append(titleLabel)
    newDetailsForm.append(titleInput)

    const dueDateLabel = document.createElement('label')
    dueDateLabel.setAttribute('for', 'new-task-duedate')
    dueDateLabel.textContent = 'Due date: '
    const dueDateInput = document.createElement('input')
    dueDateInput.setAttribute('id', 'new-task-duedate')
    dueDateInput.setAttribute('type', 'date')
    dueDateInput.setAttribute('value', '2020-01-01')
    newDetailsForm.append(dueDateLabel)
    newDetailsForm.append(dueDateInput)

    const projectLabel = document.createElement('label')
    projectLabel.setAttribute('for', 'new-task-project')
    projectLabel.textContent = 'Project: '
    const projectInput = document.createElement('select')
    projectInput.setAttribute('id', 'new-task-project')
    app.getProjects().forEach(project => {
        const option = document.createElement('option')
        option.textContent = project.title
        option.setAttribute('value', project.title)
        projectInput.append(option)
    })
    newDetailsForm.append(projectLabel)
    newDetailsForm.append(projectInput)

    const descriptionLabel = document.createElement('label')
    descriptionLabel.setAttribute('for', 'new-task-description')
    descriptionLabel.textContent = 'Description: '
    const descriptionInput = document.createElement('textarea')
    descriptionInput.setAttribute('id', 'new-task-description')
    newDetailsForm.append(descriptionLabel)
    newDetailsForm.append(descriptionInput)

    const priorityLabel = document.createElement('label')
    priorityLabel.setAttribute('for', 'new-task-priority')
    priorityLabel.textContent = 'Priority: '
    const priorityInput = document.createElement('select')
    priorityInput.setAttribute('id', 'new-task-priority')
    Object.keys(priorities).forEach(key => {
        const option = document.createElement('option')
        option.textContent = `${key} (${priorities[key]})`
        option.setAttribute('value', key)
        priorityInput.append(option)
    })
    newDetailsForm.append(priorityLabel)
    newDetailsForm.append(priorityInput)

    newDetailsForm.classList.add('task-details')

    const btnContainer = document.createElement('div')
    const addBtn = document.createElement('button')
    addBtn.textContent = id ? 'Modify' : 'Add'
    addBtn.classList.add('add-btn')
    btnContainer.appendChild(addBtn)
    btnContainer.classList.add('new-buttons')

    const cancelBtn = document.createElement('button')
    cancelBtn.textContent = 'Cancel'
    cancelBtn.classList.add('cancel-btn')
    btnContainer.appendChild(cancelBtn)
    btnContainer.classList.add('new-task-buttons')
    newDetailsForm.appendChild(btnContainer)

    const newTaskDiv = document.createElement('div')
    newTaskDiv.classList.add('task-nav')
    newTaskDiv.classList.add('task-nav-expanded')

    if (!id) {
        const newLi = document.createElement('li')
        const heading = document.createElement('p')
        heading.classList.add('heading-new')
        heading.textContent = '📌 New task'
        newTaskDiv.appendChild(heading)
        newLi.appendChild(newTaskDiv)

        newLi.classList.add('task-new')
        newLi.appendChild(newDetailsForm)
        ulTodos.prepend(newLi)
    } else {
        const targetLi = document.getElementById(id).parentElement
        targetLi.replaceChildren()
        const heading = document.createElement('p')
        heading.textContent = '📝 Modify task'
        heading.classList.add('heading-new')
        newTaskDiv.appendChild(heading)
        targetLi.appendChild(newTaskDiv)

        targetLi.classList.add('task-new')
        targetLi.appendChild(newDetailsForm)

        const targetTodo = app.getTodoById(id)
        titleInput.value = targetTodo.title
        const dueDate = targetTodo.dueDate
        const month = (dueDate.getMonth() + 1) < 10 ? '0' + String(dueDate.getMonth() + 1) : String(dueDate.getMonth() + 1)
        const date = (dueDate.getDate() + 1) < 10 ? '0' + String(dueDate.getDate() + 1) : String(dueDate.getDate() + 1)
        dueDateInput.value = `${dueDate.getFullYear()}-${month}-${date}`
        projectInput.value = targetTodo.project.title
        descriptionInput.value = targetTodo.description
        priorityInput.value = targetTodo.priority
    }
}