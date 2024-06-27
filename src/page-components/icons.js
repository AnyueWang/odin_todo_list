const addIcon = (Icon, typeStr) => {
    const div = document.createElement('div')
    div.classList.add('tooltip')
    const icon = new Image()
    icon.src = Icon
    icon.classList.add('icon')
    const tip = document.createElement('span')
    tip.textContent = `Create a new ${typeStr}.`
    tip.classList.add('tooltiptext')
    div.appendChild(icon)
    div.appendChild(tip)
    document.querySelector(`#${typeStr}-title`).appendChild(div)
    return icon
}

module.exports = {
    addIcon
}