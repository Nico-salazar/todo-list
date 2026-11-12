import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Task } from './types/task'
import { TodoForm } from './components/TodoForm'
import { PendingCount } from './components/PendingCountProps'
import { ThemeToggle } from './components/ThemeToggle'
import { TodoList } from './components/TodoList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isFormVisible, setIsFormVisible] = useState(true)
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null)

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

    setExpandedTaskId((currentTaskId) =>
      currentTaskId === taskId ? null : currentTaskId,
    )

    if (tasks.length === 1) {
      setIsFormVisible(true)
    }
  }

  function handleToggleExpandedTask(taskId: string) {
    setExpandedTaskId((currentTaskId) =>
      currentTaskId === taskId ? null : taskId,
    )
  }

  const shouldShowForm = tasks.length === 0 || isFormVisible

  return (
    <main className="app-shell">
      <header className="app-heading">
        <h1>Mis tareas</h1>
        <ThemeToggle />
      </header>

      {shouldShowForm ? (
        <TodoForm
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onSubmit={handleSubmit}
          onHide={tasks.length > 0 ? () => setIsFormVisible(false) : undefined}
        />
      ) : (
        <button
          className="todo-form-open"
          type="button"
          onClick={() => setIsFormVisible(true)}
        >
          <span aria-hidden="true">＋</span>
          Agregar otra tarea
        </button>
      )}

      <PendingCount count={pendingCount} />

      <TodoList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        expandedTaskId={expandedTaskId}
        onToggleExpand={handleToggleExpandedTask}
      />
    </main>
  )
}

export default App
