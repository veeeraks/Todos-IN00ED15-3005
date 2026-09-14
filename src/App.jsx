import './App.css'
import { useState, useEffect } from 'react'
import { useUser } from '../context/useUser'
import axios from 'axios'
import Row from './components/Row'

const apiUrl = 'http://localhost:3001'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const { user } = useUser()

  useEffect(() => {
    axios.get(`${apiUrl}/tasks`)
      .then(response => {
        setTasks(response.data)
      })
      .catch(error => {
        alert(error.response?.data?.error || error.message)
      })
  }, [])

  const addTask = (e) => {
    e.preventDefault()

    const description = task.trim()

    if (!description) return

    const newTask = { description: description }

    axios.post(`${apiUrl}/tasks`, { task: newTask })
      .then(response => {
        setTasks(currentTasks => [...currentTasks, response.data])
        setTask('')
      })
      .catch(error => {
        alert(error.response?.data?.error || error.message)
      })
  }

  const deleteTask = (deleted) => {
    axios.delete(`${apiUrl}/tasks/${deleted}`)
      .then(() => {
        setTasks(currentTasks =>
          currentTasks.filter(item => item.id !== deleted)
        )
      })
      .catch(error => {
        alert(error.response?.data?.error || error.message)
      })
  }

  return (
    <div id="container">
      <h3>Todos</h3>

      <form onSubmit={addTask}>
        <input
          placeholder="Add new task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {
          tasks.map(task => (
            <Row task={task} key={task.id} onDelete={deleteTask} />
          ))
        }
      </ul>
    </div>
  )
}

export default App