import { myTodo, useTodos } from "../store/Todos"
import {useSearchParams} from "react-router-dom"

const Todos = () => {
    const {todos} = useTodos()
    const {toggleTodoAsCompleted} = useTodos()
    const {handleDeleteTodo} = useTodos() 

    const [searchParams] = useSearchParams()
    const todosData = searchParams.get("todos");  
    console.log(todosData,"data of the dodo")

    let filteredTodos = todos;
    
    if(todosData==="active"){
      filteredTodos = filteredTodos.filter((task)=>!task.completed)
    }
    if(todosData==="completed"){
      filteredTodos = filteredTodos.filter((task)=>task.completed)
    }

  return (
    <ul className="main-task">
        { 
        filteredTodos.map((todo:myTodo) =>{
           return <li key={todo.id}>
            <input type="checkbox" id={`todo-${todo.id}`}
            checked={todo.completed}
            onChange={() => toggleTodoAsCompleted(todo.id)}
            />
            <label htmlFor={`todo-${todo.id}`} >{todo.task}</label>
            
            {
                todo.completed && (
                    <button type="button" onClick={()=>handleDeleteTodo(todo.id)}>Delete</button>
                )
            }

            </li>
        })
        }
    </ul>
  )
}

export default Todos