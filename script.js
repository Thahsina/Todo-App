const input = document.getElementById('input')
const todosUL = document.querySelector('.todos')

const form =  document.getElementById('form')


const todos = JSON.parse(localStorage.getItem('todos'))


if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})



function addTodo(todo){
    
    let todoText = input.value

    if(todo){
        todoText = todo.text
        
    }

    if(todoText){
        const todoEl = document.createElement('li')

        todoEl.innerText = todoText

        

        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }
        // for the todos coming from local storage

        todoEl.addEventListener('click', ()=>{
            todoEl.classList.toggle('completed')
            console.log(todoEl);
        })

        todoEl.addEventListener('contextmenu',(e)=>{
            e.preventDefault()

            todoEl.remove()
            updateLS()
        })
        
        todosUL.appendChild(todoEl)
        input.value = ''

        updateLS()

    }
}


function updateLS() {
    const todosEl = document.querySelectorAll('li')

    const todos =[]

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}