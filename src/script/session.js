// Session Storage

// Custom Event Renderer
const SAVE_TODOS_DATA = 'save-data'
const SAVE_TODO_PROGRESS = 'save-todo-progress'
const SAVE_TODO_DONE = 'save-todo-done'

// Storage Key
const STORAGE_KEY_TODOS = 'todos'
const STORAGE_KEY_ON_PROGRESS = 'onProgress'
const STORAGE_KEY_IS_DONE = 'isDone'

// Check Compatibility Browser Storage
const checkCompatibility = () => {
    if (typeof(Storage) === 'undefined') {
        console.log('Maaf Browser tidak mendukung Storage')
        return false
    } else {
        return true
    }
}

const saveTodos = () => {
    if (checkCompatibility()) {
        const toStringTodos = JSON.stringify(todos)
        sessionStorage.setItem(STORAGE_KEY_TODOS, toStringTodos)
    }
    console.log(todos)
}

const saveOnProgress = () => {
    const toStringOnProgress = JSON.stringify(onProgess)
    sessionStorage.setItem(STORAGE_KEY_ON_PROGRESS, toStringOnProgress)
}

const saveIsDone = () => {
    const toStringIsDone = JSON.stringify(isDone)
    sessionStorage.setItem(STORAGE_KEY_IS_DONE, toStringIsDone)
}

document.addEventListener(SAVE_TODO_DONE, () => {

})

const loadTodos = () => {

    const parse = JSON.parse(sessionStorage.getItem(STORAGE_KEY_TODOS))

    if (parse !== null) {
        for (const res of parse) {
            todos.push(res)
        }
    }

    document.dispatchEvent(new Event(RENDER_TODOS))
}

const loadOnProgress = () => {
    const parse = JSON.parse(sessionStorage.getItem(STORAGE_KEY_ON_PROGRESS))

    if (parse !== null) {
        for (const res of parse) {
            onProgess.push(res)
        }
    }

    document.dispatchEvent(new Event(RENDER_IN_PROGRESS))
}

const loadIsDone = () => {
    const parse = JSON.parse(sessionStorage.getItem(STORAGE_KEY_IS_DONE))

    if (parse !== null) {
        for (const res of parse) {
            isDone.push(res)
        }
    }

    document.dispatchEvent(new Event(RENDER_DONE))
}

const removeItem = (diff, id) => {
    switch (diff) {
        case 0:
            sessionStorage.removeItem(STORAGE_KEY_TODOS, id)
            break
        case 1:
            sessionStorage.removeItem(STORAGE_KEY_ON_PROGRESS, id)
            break
    }
}

loadTodos()
loadOnProgress()
loadIsDone()

