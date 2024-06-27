require('./styles.css')
const { compareAsc, format } = require('date-fns')
const helper = require('./utils/helper')
import IconAddProject from './resources/icons/folder-plus.svg'
import IconAddTodo from './resources/icons/file-plus.svg'

const ulProjects = document.querySelector("#project-list")
const ulTodos = document.querySelector("#todo-list")
const h3ProjectDescription = document.querySelector('#project-description')

const iconAddProject = new Image()
iconAddProject.src = IconAddProject
iconAddProject.classList.add('icon')
document.querySelector('#project-title').appendChild(iconAddProject)

const iconAddTodo = new Image()
iconAddTodo.src = IconAddTodo
iconAddTodo.classList.add('icon')
document.querySelector('#todo-title').appendChild(iconAddTodo)

let targetProject = helper.defaultProject()

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

displayRelatedTodos(targetProject)

function displayTargetTodo() {
    const todoBtns = document.querySelectorAll('.task-nav')

    todoBtns.forEach(eachBtn => {
        eachBtn.addEventListener('click', () => {
            if (eachBtn.classList.contains('task-nav-expanded')) {
                eachBtn.classList.remove('task-nav-expanded')
                const deletedDetails = eachBtn.nextElementSibling
                deletedDetails.remove()
            } else {
                const siblings = [...eachBtn.parentElement.parentElement.children]
                siblings.forEach(eachChild => {
                    if (eachChild.lastChild.classList.contains('task-details')) {
                        eachChild.firstChild.classList.remove('task-nav-expanded')
                        eachChild.lastChild.remove()
                    }
                })

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
                detailPriority.textContent = todo.priority
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

            }
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
        title.textContent = eachTodo.title
        date.textContent = format(eachTodo.dueDate, 'dd-MMM-yyyy')
        newBtn.appendChild(title)
        newBtn.appendChild(date)
        newBtn.classList.add('task-nav')
        newBtn.setAttribute("id", `${eachTodo.id}`)
        newLi.appendChild(newBtn)
        ulTodos.appendChild(newLi)
    })

    displayTargetTodo()
}
