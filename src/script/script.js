const valueInput = document.getElementById('input-todo')
const RENDER_TODOS = 'render-todos'
const RENDER_IN_PROGRESS = 'render-in-progress'
const RENDER_DONE = 'render-done'
const todos = []
const onProgess = []
const isDone = []
let tempTodos

window.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.getElementById('todo-input')
    submitForm.addEventListener('submit', e => {
        e.preventDefault()
        addTodo()
    })
})

const addTodo = () => {
    const id = +new Date();
    const value = valueInput.value
    const isCompleted = false
    const result = {
        id,
        value,
        isCompleted,
    }
    todos.push(result)
    tempTodos = result
    valueInput.value = ""
    document.dispatchEvent(new Event(RENDER_TODOS))
}

document.addEventListener(RENDER_TODOS, () => {
    const todoTemp = document.getElementById('todos')
    todoTemp.append(createCard(tempTodos))    
})

document.addEventListener(RENDER_IN_PROGRESS, () => {

})

document.addEventListener(RENDER_DONE, () => {

})

const createCard = ({id, value}) => {
    const container = document.createElement('div')
    container.classList.add('sec')
    container.classList.add('todo')
    const h4 = document.createElement('h4')
    h4.innerText = value
    const btnProcess = document.createElement('button')
    btnProcess.classList.add('btn')
    btnProcess.innerText = 'Process'
    btnProcess.addEventListener('click', () => {
        processTodo(id)
    })

    container.append(h4, btnProcess)
    return container
}

const processTodo = id => {
    const container = document.createElement('div')
    container.classList.add('todo')
    const h4 = document.createElement('h4')
    h4.innerText = value
    const btnProcess = document.createElement('button')
    btnProcess.innerText = 'Process'
    btnProcess.addEventListener('click', () => {
        endProgress(id)
    })

    document.dispatchEvent(new Event(RENDER_IN_PROGRESS))
}


