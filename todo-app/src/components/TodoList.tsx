import type { Task } from '../types/task'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  tasks: Task[]
  onToggle: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export function TodoList({ tasks, onToggle, onDelete }: TodoListProps) {
  if (tasks.length === 0) {
    return <p>Aún no hay tareas. Agrega una para comenzar.</p>
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}