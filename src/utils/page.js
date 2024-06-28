const IconAddProject = require('../resources/icons/folder-plus.svg')
const IconAddTodo = require('../resources/icons/file-plus.svg')
const IconDelete = require('../resources/icons/delete.svg')
const IconUndone = require('../resources/icons/undone.svg')
const IconDone = require('../resources/icons/done.svg')

const warnings = require('../page-components/warnings')
const icons = require('../page-components/icons')
const resettings = require('../page-actions/resettings')

const priorities = {
    1: 'Lowest',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Highest'
}

const display = () => {
    const { compareAsc, format } = require('date-fns')
    const helper = require('../utils/helper')

    const ulProjects = document.querySelector("#project-list")
    const ulTodos = document.querySelector("#todo-list")
    const h3ProjectDescription = document.querySelector('#project-description')
    const projectTitle = document.querySelector(`#project-title`)
    const taskTitle = document.querySelector(`#task-title`)

    const iconAddProject = icons.addIcon(IconAddProject, projectTitle, 'Create a new project.')
    const iconAddTodo = icons.addIcon(IconAddTodo, taskTitle, 'Create a new task')

    let targetProject = helper.defaultProject()

    iconAddProject.addEventListener('click', () => {
        if (document.querySelector('.project-new') || document.querySelector('.task-new')) {
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
            if (helper.isTitleExist(title)) {
                warnings.addWarningBefore(btnContainer, 'Project name already exists!')
                return
            }
            if (title === '') {
                warnings.addWarningBefore(btnContainer, 'Project name should not be empty!')
                return
            }
            helper.addNewProject(title, description)
            document.querySelector('.project-new').remove()
            displayProjects()
        })

        cancelBtn.addEventListener('click', (event) => {
            event.preventDefault()
            document.querySelector('.project-new').remove()
        })
    })

    iconAddTodo.addEventListener('click', () => {
        if (document.querySelector('.project-new') || document.querySelector('.task-new')) {
            return
        }
        resettings.closeExpandedTask()
        const newLi = document.createElement('li')
        const newTaskDiv = document.createElement('div')
        newTaskDiv.classList.add('task-nav')
        newTaskDiv.classList.add('task-nav-expanded')
        const heading = document.createElement('p')
        heading.textContent = '📌 New task'
        heading.classList.add('heading-new')
        newTaskDiv.appendChild(heading)
        newLi.appendChild(newTaskDiv)

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
        projectLabel.textContent = 'Porject: '
        const projectInput = document.createElement('input')
        projectInput.setAttribute('id', 'new-task-project')
        projectInput.setAttribute('list', 'available-projects')
        const projectList = document.createElement('datalist')
        projectList.setAttribute('id', 'available-projects')
        helper.getProjects().forEach(project => {
            const option = document.createElement('option')
            option.setAttribute('value', project.title)
            projectList.append(option)
        })
        newDetailsForm.append(projectLabel)
        newDetailsForm.append(projectInput)
        newDetailsForm.append(projectList)

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
        const priorityInput = document.createElement('input')
        priorityInput.setAttribute('id', 'new-task-priority')
        priorityInput.setAttribute('list', 'priorities')
        const priorityList = document.createElement('datalist')
        priorityList.setAttribute('id', 'priorities')
        Object.keys(priorities).forEach(key => {
            const option = document.createElement('option')
            option.setAttribute('value', `${key} (${priorities[key]})`)
            priorityList.append(option)
        })
        newDetailsForm.append(priorityList)
        newDetailsForm.append(priorityLabel)
        newDetailsForm.append(priorityInput)

        const checklistLabel = document.createElement('label')
        checklistLabel.setAttribute('for', 'new-task-checklist')
        checklistLabel.textContent = 'Checklist: '
        const checklistInput = document.createElement('input')
        checklistInput.setAttribute('id', 'new-task-checklist')
        newDetailsForm.append(checklistLabel)
        newDetailsForm.append(checklistInput)

        newDetailsForm.classList.add('task-details')

        const btnContainer = document.createElement('div')
        const addBtn = document.createElement('button')
        addBtn.textContent = 'Add'
        btnContainer.appendChild(addBtn)
        btnContainer.classList.add('new-buttons')

        const cancelBtn = document.createElement('button')
        cancelBtn.textContent = 'Cancel'
        btnContainer.appendChild(cancelBtn)
        btnContainer.classList.add('new-task-buttons')
        newDetailsForm.appendChild(btnContainer)

        newLi.classList.add('task-new')
        newLi.appendChild(newDetailsForm)
        ulTodos.prepend(newLi)

        addBtn.addEventListener('click', (event) => {
            event.preventDefault()
            const title = document.querySelector('#new-task-title').value
            const dueDate = document.querySelector('#new-task-duedate').value
            const dueDateSplits = dueDate.split('-')
            const project = document.querySelector('#new-task-project').value
            const description = document.querySelector('#new-task-description').value
            const priority = document.querySelector('#new-task-priority').value
            const checklist = document.querySelector('#new-task-checklist').value
            if (title === '') {
                warnings.addWarningBefore(btnContainer, 'Task name should not be empty!')
                return
            }
            helper.addNewTodo(
                title,
                new Date(dueDateSplits[0], dueDateSplits[1] - 1, dueDateSplits[2]),
                helper.getProjectByName(project || 'Default'),
                description,
                Number(priority.split(' ')[0]) || 1,
                checklist
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
        helper.getProjects().forEach(eachProject => {
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
                if (document.querySelector('.project-new') || document.querySelector('.task-new')) {
                    return
                }
                targetProject = helper.getProjectByName(eachBtn.textContent)
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
                if (document.querySelector('.project-new') || document.querySelector('.task-new')) {
                    return
                }
                if (eachBtn.classList.contains('task-nav-expanded')) {
                    eachBtn.classList.remove('task-nav-expanded')
                    eachBtn.nextSibling.remove()
                    return
                }

                resettings.closeExpandedTask()

                eachBtn.classList.add('task-nav-expanded')
                const id = eachBtn.getAttribute('id')
                const todo = helper.getTodoById(id)
                const collapse = document.createElement('div')
                collapse.classList.add('task-details')

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
                const titleChecklist = document.createElement('p')
                titleChecklist.textContent = `Checklist:`
                collapse.appendChild(titleChecklist)
                if (todo.checklist) {
                    const detailChecklist = document.createElement('ol')
                    todo.checklist.forEach(eachItem => {
                        const liItem = document.createElement('li')
                        liItem.textContent = eachItem
                        detailChecklist.appendChild(liItem)
                    })
                    collapse.appendChild(detailChecklist)
                } else {
                    const detailChecklist = document.createElement('p')
                    detailChecklist.textContent = '(none)'
                    collapse.appendChild(detailChecklist)
                }
                eachBtn.parentElement.appendChild(collapse)

            })
        }, true)
    }

    function displayRelatedTodos(project) {
        ulTodos.replaceChildren()
        const todos = helper.getTodosByProject(project)
        const todosOrderedByTime = todos.sort((a, b) => compareAsc(a.dueDate, b.dueDate))
        todosOrderedByTime.forEach(eachTodo => {
            const newLi = document.createElement("li")
            const newBtn = document.createElement('div')
            const title = document.createElement('div')
            const date = document.createElement('div')
            const StatusIcon = eachTodo.isDone ? IconDone : IconUndone
            const statusTip =  eachTodo.isDone ? 'The task is done. Press to set undone.' : 'The task is undone. Press to set done.'
            const iconStatus = icons.addIcon(StatusIcon, title, statusTip)
            const iconDelete = icons.addIcon(IconDelete, title, 'Delete the task.')
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

            iconDelete.addEventListener('click', (event) => {
                event.stopPropagation()
                const id = event.target.parentElement.parentElement.parentElement.id
                const deletedTodo = helper.getTodoById(id)
                helper.deleteTodo(deletedTodo)
                document.getElementById(id).parentElement.remove()
            })
        })
        displayTargetTodo()
    }
}

module.exports = {
    display,
}