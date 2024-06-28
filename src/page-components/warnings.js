const addWarningBefore = (container, message) => {
    const warnedMessage = document.querySelector('.warning')
    if (warnedMessage) {
        warnedMessage.remove()
    }
    const warning = document.createElement('div')
    warning.textContent = `* ${message}`
    warning.classList.add('warning')
    container.insertAdjacentElement('beforebegin', warning)
    setTimeout(() => warning.remove(), 5000)
}

module.exports = {
    addWarningBefore
}