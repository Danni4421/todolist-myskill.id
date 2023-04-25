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
    if (typeof(Storage) === undefined) {
        console.log('Maaf Browser tidak mendukung Storage')
        return false
    } else {
        return true
    }
}

