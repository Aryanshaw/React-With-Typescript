import AddTodo from './components/AddTodo'
import NavBar from './components/NavBar'
import Todos from './components/Todos'
import "./App.css"

const App = () => {
  return (
    <main>
      <h1>Todo+ react with todo</h1>
      <NavBar/>
      <AddTodo/>
      <Todos />
    </main>
  )
}

export default App