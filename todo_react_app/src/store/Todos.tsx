import {ReactNode, createContext, useState,useContext} from "react"

export type TodosProviderProps={
children: ReactNode
}

export type myTodo={
    id:string;
    task:string;
    completed:boolean;
    createdAt:Date;
}

export type TodosContext ={
    todos:myTodo[];
    handleAddTodo:(task:string)=>void;
    toggleTodoAsCompleted:(id:string)=>void;
    handleDeleteTodo:(id:string)=>void;
}


export const todosContext = createContext<TodosContext | null>(null)

export const TodosProvider =({children}:TodosProviderProps)=>{
    
    const [todos, setTodos] = useState<myTodo[]>(()=>{
        try{
          const newTodos  = localStorage.getItem("todos") || "[]"
          return JSON.parse(newTodos) as myTodo[]
        }catch(e){
            console.log('error', e);
            return []
        }
    })

    const handleAddTodo=(task:string)=>{
        setTodos((prev)=>{
           const newTodos:myTodo[]=[
            {
                id:Math.random().toString(),
                task:task,
                completed:false,
                createdAt :new Date()
            },
            ...prev
           ]
           localStorage.setItem("todos",JSON.stringify(newTodos))
           return newTodos
        })
    }

    const toggleTodoAsCompleted=(id:string) => {
         setTodos((prev)=>{
           const newTodos = prev.map((todo)=>{
            if(todo.id === id){
              return {...todo, completed:!todo.completed}
            }else{
                return todo;
            }
           })
           localStorage.setItem("todos",JSON.stringify(newTodos))
           return newTodos;
         })
    }

    const handleDeleteTodo =(id:string)=>{
        setTodos((prev)=>{
            const newTodos= prev.filter((todo)=>todo.id!==id)
            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos;
    })
    
    }

    return <todosContext.Provider value={{todos,handleAddTodo,toggleTodoAsCompleted,handleDeleteTodo}}>
        {children}
     </todosContext.Provider>
}


//consumer 

export const useTodos=() => {
    const todosConsumer = useContext(todosContext)
    if(!todosConsumer){
        throw new Error("useTodos must be used within a Todos Provider")
    }
    return todosConsumer
}