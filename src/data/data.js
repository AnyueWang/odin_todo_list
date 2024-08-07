const projects = [
    {
        "title": "Weekend plans",
        "description": "Activities for the weekend!!!"
    },
    {
        "title": "Must-do",
        "description": "These things should be done and have no excuse to delay!!!"
    }
]

const todos = [
    {
        "title": "Shopping for food",
        "date": "02-05-2030", //dd-mm-yyyy
    },
    {
        "title": "Cinema",
        "date": "03-05-2030",
        "description": "Go for a date"
    },
    {
        "title": "Dance class",
        "date": "09-04-2030",
        "description": "Learning something new",
        "priority": 4
    },
    {
        "title": "Boxing class",
        "date": "09-06-2022",
        "description": "To keep body fit and healthy",
        "priority": 3,
        "isDone": true
    }
]

module.exports = {
    projects,
    todos,
}