import type { FormEvent } from 'react'

interface TodoFormProps {
  title: string
  description: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function TodoForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}: TodoFormProps) {
  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <label htmlFor="task-title">Título</label>
      <input
        id="task-title"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        required
      />

      <label htmlFor="task-description">Descripción (opcional)</label>
      <textarea
        id="task-description"
        value={description}
        onChange={(event) => onDescriptionChange(event.target.value)}
        rows={3}
      />

      <button type="submit">Agregar tarea</button>
    </form>
  )
}
