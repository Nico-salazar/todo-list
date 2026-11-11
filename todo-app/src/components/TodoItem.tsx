import type { Task } from '../types/task'

interface TodoItemProps {
  task: Task
  onToggle: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export function TodoItem({ task, onToggle, onDelete }: TodoItemProps) {
  const itemClassName = task.completed
    ? 'task-item task-item--completed'
    : 'task-item'
  const statusClassName = task.completed
    ? 'task-status task-status--completed'
    : 'task-status'

  return (
    <li className={itemClassName}>
      <strong>{task.title}</strong>

      {task.description && <p>{task.description}</p>}

      <small className={statusClassName}>
        {task.completed ? 'Completada' : 'Pendiente'}
      </small>

      <button
        className="task-toggle"
        type="button"
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? 'Marcar como pendiente' : 'Completar'}
      </button>

      <button
        className="task-delete"
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={'Eliminar tarea: ' + task.title}
      >
        Eliminar
      </button>
    </li>
  )
}
