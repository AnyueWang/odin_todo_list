const todos = require('./controllers/todos')
const projects = require('./controllers/projects')

todos.addNewTodo('Shopping for food',
    new Date(2030, 5, 2),
    projects.getDefaultProject(),)

projects.addNewProject('Weekend', 'must-do activities for this weekend')

console.log(todos.getTodoList())
console.log(projects.getProjectList())
