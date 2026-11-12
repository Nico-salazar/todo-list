import type { Task } from '../types/task'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  tasks: Task[]
  onToggle: (taskId: string) => void
  onDelete: (taskId: string) => void
  expandedTaskId: string | null
  onToggleExpand: (taskId: string) => void
}

export function TodoList({
  tasks,
  onToggle,
  onDelete,
  expandedTaskId,
  onToggleExpand,
}: TodoListProps) {
  if (tasks.length === 0) {
    return <p className="empty-state">Aún no hay tareas. Agrega una para comenzar.</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          isExpanded={expandedTaskId === task.id}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </ul>
  )
}
