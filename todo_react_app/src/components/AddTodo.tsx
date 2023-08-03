import {FormEvent, useState} from 'react'
import { useTodos } from '../store/Todos';

const AddTodo = () => {

    const[todo,setTodo] = useState("");
    const {handleAddTodo} = useTodos()

    const handleFormSubmit=(e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleAddTodo(todo)
      setTodo("")
      console.log("Submitted",todo);
    }
   

   

  return (
     <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder='Add Todo' value={todo} onChange={(e)=>setTodo(e.target.value)}/>
        <button type="submit">Add</button>

     </form>
    )
}

export default AddTodo