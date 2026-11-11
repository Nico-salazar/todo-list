import type { Task } from '../types/task'

interface TodoItemProps {
    task:Task
    onToggle: (taskId: string) => void
    onDelete: (taskId: string) => void
}

export function TodoItem({task, onToggle, onDelete}: TodoItemProps){
    return(
        <li>
            <strong>{task.title}</strong>

        {task.description && <p>{task.description}</p>}

        <small>{task.completed ? 'Completada' : 'Pendiente'}</small>

        <button type="button" onClick={()=> onToggle(task.id)}>
            {task.completed ? 'Marcar como pendiente' : 'Completar'}
        </button>

        <button
        type="button" onClick={() => onDelete(task.id)} 
        aria-label={`Eliminar tarea: ${task.title}`}
>
        Eliminar
        </button>
        </li>
    )
}