const tooltips = require('./tooltips')

const addIcon = (Icon, typeStr) => {
    const div = document.createElement('div')
    const icon = new Image()
    icon.src = Icon
    icon.classList.add('icon')
    div.appendChild(icon)
    tooltips.addTooltipToDiv(div, `Create a new ${typeStr}`)
    document.querySelector(`#${typeStr}-title`).appendChild(div)
    return icon
}

module.exports = {
    addIcon
}