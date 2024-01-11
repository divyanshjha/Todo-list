import { useState ,useEffect} from 'react'
import {TodoProvider} from "./context"
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  
  const [todos, setTodos] = useState([]) //empty array

  const addTodo =(todo)=>{
    setTodos((prev)=> [{id: Date.now(),...todo},...prev])
  }

  /* we are updating the todo list with help of id and the todo(object)
  we are using its previous todo then using the loop(.map) in the we are chehcking the prev
  todo if pevTodo.id(its a object we are taking its id) is equal to the id of todo we left
  todo as it is and if not then its prevTodo will be take its place
   */
  const updateTodo =(id, todo)=>{
    setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id === id ? todo : prevTodo )))
  }

  //Deleting the Todo using the ID
  const deleteTodo =(id)=>{
    setTodos((prev)=> prev.filter((todo)=> todo.id !== id ))
  }

  // toggle effect using the check box
  /* here we are doing the same but in the end we are using the spread operator (...prev)
  for not deleting all the prev value and after that we are using the todo(object)
  property completed and overwrite its value using the ! sign */
  const toggleComplete =(id)=>{
    setTodos((prev)=> prev.map((prevTodo) => 
    prevTodo.id === id ? {...prevTodo, 
      completed: !prevTodo.completed} : prevTodo))
  }


  /* using the local storage with the help of useEffect() 
  to apply all those changes on the todo*/

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0)
    {
      setTodos(todos)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  

  return (
    <TodoProvider value={{todos, addTodo, deleteTodo,
    updateTodo, toggleComplete}}  >
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/> 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=> (
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
