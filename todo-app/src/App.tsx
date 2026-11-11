import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Task } from './types/task'
import { TodoForm } from './components/TodoForm'
import { PendingCount } from './components/PendingCountProps'
import { TodoList } from './components/TodoList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const pendingCount = tasks.filter((task) => !task.completed).length

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanTitle = title.trim()
    const cleanDescription = description.trim()

    if (!cleanTitle) return

    const now = new Date()

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      ...(cleanDescription ? { description: cleanDescription } : {}),
      completed: false,
      createdAt: now,
      updatedAt: now,
    }

    setTasks((currentTasks) => [...currentTasks, newTask])
    setTitle('')
    setDescription('')
  }

  function handleToggleTask(taskId: string) {
    const now = new Date()

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, updatedAt: now }
          : task,
      ),
    )
  }

  function handleDeleteTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  return (
    <main className="app-shell">
      <h1>Mis tareas</h1>

      <TodoForm
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
      />

      <PendingCount count={pendingCount} />

      <TodoList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </main>
  )
}

export default App
