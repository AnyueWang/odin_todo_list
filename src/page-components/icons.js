const tooltips = require('./tooltips')

const IconAddProject = require('../resources/icons/folder-plus.svg')
const IconAddTodo = require('../resources/icons/file-plus.svg')
const IconDelete = require('../resources/icons/delete.svg')
const IconUndone = require('../resources/icons/undone.svg')
const IconDone = require('../resources/icons/done.svg')
const IconEdit = require('../resources/icons/edit.svg')

const addIcon = (Icon, parentDiv, explanation) => {
    const div = document.createElement('div')
    const icon = new Image()
    icon.src = Icon
    icon.classList.add('icon')
    div.appendChild(icon)
    tooltips.addTooltipToDiv(div, explanation)
    parentDiv.appendChild(div)
    return icon
}

module.exports = {
    IconAddProject,
    IconAddTodo,
    IconDelete,
    IconUndone,
    IconDone,
    IconEdit,

    addIcon
}