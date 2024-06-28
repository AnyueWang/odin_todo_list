const tooltips = require('./tooltips')

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
    addIcon
}