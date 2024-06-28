const addTooltipToDiv = (div, explanation) => {
    div.classList.add('tooltip')
    const tip = document.createElement('span')
    tip.textContent = explanation
    tip.classList.add('tooltiptext')
    div.appendChild(tip)
}

module.exports = {
    addTooltipToDiv,
}