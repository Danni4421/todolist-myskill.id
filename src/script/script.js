const valueInput = document.getElementById('input-todo')
const RENDER_TODOS = 'render-todos'
const RENDER_IN_PROGRESS = 'render-in-progress'
const RENDER_DONE = 'render-done'
const REMOVE_TODOS = 'remove-todos'
const REMOVE_IN_PROGRESS = 'remove-inprogress'
const todos = []
const onProgess = []
const isDone = []
let tempTodos
let tempOnProgress
let tempDone

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
    valueInput.value = ''
    
    saveTodos()
    document.dispatchEvent(new Event(RENDER_TODOS))
}

const todoTemp = document.getElementById('todos')
const onProgressTemp = document.getElementById('on-progress')
document.addEventListener(RENDER_TODOS, () => {
    todoTemp.innerHTML = ""
    for (const todo of todos) {
        todoTemp.append(createCard(todo.id, todo.value, 0))
    }
})

document.addEventListener(RENDER_IN_PROGRESS, () => {
    onProgressTemp.innerHTML = ""
    for (const prog of onProgess) {
        onProgressTemp.append(createCard(prog.id, prog.value, 1))
    }
})

document.addEventListener(RENDER_DONE, () => {
    const isCompleted = document.getElementById('isDone')
    isCompleted.innerHTML = ""
    for (const done of isDone) {
        isCompleted.append(createCard(done.id, done.value, 2))
    }
})

const createCard = (id, value, different) => {
    const container = document.createElement('div')
    container.classList.add('sec')
    container.setAttribute('id', id)
    const h4 = document.createElement('h4')
    h4.innerText = value
    
    if (different < 2) {
        const btnProcess = document.createElement('button')
        btnProcess.classList.add('btn')
        switch (different) {
            case 0:
            container.classList.add('todo')
            btnProcess.innerText = 'Process'
            btnProcess.addEventListener('click', () => {
                processTodo(id)
            })
            break;
            case 1:
            container.classList.add('on-progress')
            btnProcess.innerText = 'Done'
            btnProcess.addEventListener('click', () => {
                endProgress(id)
            })
            break;
        }
        container.append(h4, btnProcess)
    } else {
        container.classList.add('done')
        container.append(h4)
    }

    return container
}

const processTodo = id => {
    tempOnProgress = todos.find(todo => todo.id === id)
    onProgess.push(tempOnProgress)
    todos.splice(tempOnProgress, 1)
    removeItem(0)

    todoTemp.removeChild(document.getElementById(`${id}`))
    saveOnProgress()

    document.dispatchEvent(new Event(RENDER_IN_PROGRESS))
}

const endProgress = id => {
    tempDone = onProgess.find(onProg => onProg.id === id)
    tempDone.isCompleted = true
    isDone.push(tempDone)
    onProgess.splice(tempDone, 1)
    removeItem(1)

    onProgressTemp.removeChild(document.getElementById(`${id}`))
    saveIsDone()
    
    document.dispatchEvent(new Event(RENDER_DONE))
}
