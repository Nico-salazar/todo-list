import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Task } from '../types/task'

interface TodoItemProps {
  task: Task
  onToggle: (taskId: string) => void
  onDelete: (taskId: string) => void
  isExpanded: boolean
  onToggleExpand: (taskId: string) => void
}

type RingAnimation = 'complete' | 'reopen'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function prefersReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches
}

export function TodoItem({
  task,
  onToggle,
  onDelete,
  isExpanded,
  onToggleExpand,
}: TodoItemProps) {
  const itemRef = useRef<HTMLLIElement>(null)
  const previousCompletedRef = useRef(task.completed)
  const ringStartTimerRef = useRef<number | null>(null)
  const ringTimerRef = useRef<number | null>(null)
  const leaveTimerRef = useRef<number | null>(null)
  const [ringAnimation, setRingAnimation] = useState<RingAnimation | null>(null)
  const [ringKey, setRingKey] = useState(0)
  const [isLeaving, setIsLeaving] = useState(false)
  const [leaveHeight, setLeaveHeight] = useState<number | null>(null)

  useEffect(() => {
    const previousCompleted = previousCompletedRef.current
    previousCompletedRef.current = task.completed

    if (previousCompleted === task.completed || prefersReducedMotion()) {
      return
    }

    const nextRingAnimation: RingAnimation = task.completed ? 'complete' : 'reopen'

    ringStartTimerRef.current = window.setTimeout(() => {
      ringStartTimerRef.current = null
      setRingAnimation(nextRingAnimation)
      setRingKey((currentKey) => currentKey + 1)

      ringTimerRef.current = window.setTimeout(() => {
        ringTimerRef.current = null
        setRingAnimation(null)
      }, 520)
    }, 0)

    return () => {
      if (ringStartTimerRef.current !== null) {
        window.clearTimeout(ringStartTimerRef.current)
        ringStartTimerRef.current = null
      }

      if (ringTimerRef.current !== null) {
        window.clearTimeout(ringTimerRef.current)
        ringTimerRef.current = null
      }
    }
  }, [task.completed])

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current !== null) {
        window.clearTimeout(leaveTimerRef.current)
        leaveTimerRef.current = null
      }
    }
  }, [])

  function handleToggle() {
    if (isLeaving) return

    onToggle(task.id)
  }

  function handleDelete() {
    if (isLeaving) return

    if (prefersReducedMotion()) {
      onDelete(task.id)
      return
    }

    const itemHeight = itemRef.current?.offsetHeight

    if (itemHeight === undefined) {
      onDelete(task.id)
      return
    }

    setLeaveHeight(itemHeight)
    setIsLeaving(true)

    leaveTimerRef.current = window.setTimeout(() => {
      leaveTimerRef.current = null
      onDelete(task.id)
    }, 450)
  }

  const itemClassName =
    'task-item' +
    (task.completed ? ' task-item--completed' : '') +
    (isExpanded ? ' task-item--expanded' : '') +
    (isLeaving ? ' task-item--leaving' : '')
  const statusClassName = task.completed
    ? 'task-status task-status--completed'
    : 'task-status'
  const leaveStyle: CSSProperties | undefined =
    leaveHeight === null
      ? undefined
      : ({ '--h': leaveHeight + 'px' } as CSSProperties)
  const shouldRenderRing =
    ringAnimation !== null && !prefersReducedMotion()

  return (
    <li
      ref={itemRef}
      className={itemClassName}
      style={leaveStyle}
    >
      {shouldRenderRing && (
        <svg
          key={ringKey}
          className={'task-ring task-ring--' + ringAnimation}
          aria-hidden="true"
          focusable="false"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="16"
            ry="16"
            pathLength={1}
          />
        </svg>
      )}

      <button
        className="task-content"
        type="button"
        aria-expanded={isExpanded}
        aria-controls={'task-content-' + task.id}
        aria-label={
          (isExpanded ? 'Contraer contenido de la tarea: ' : 'Expandir contenido de la tarea: ') +
          task.title
        }
        onClick={() => onToggleExpand(task.id)}
        disabled={isLeaving}
      >
        <span id={'task-content-' + task.id} className="task-copy">
          <strong className="task-title">{task.title}</strong>
          {task.description && (
            <span className="task-description">{task.description}</span>
          )}
        </span>
      </button>

      <small className={statusClassName}>
        {task.completed ? 'Completada' : 'Pendiente'}
      </small>

      <button
        className="task-toggle"
        type="button"
        onClick={handleToggle}
        disabled={isLeaving}
      >
        {task.completed ? 'Marcar como pendiente' : 'Completar'}
      </button>

      <button
        className="task-delete"
        type="button"
        onClick={handleDelete}
        aria-label={'Eliminar tarea: ' + task.title}
        disabled={isLeaving}
      >
        Eliminar
      </button>
    </li>
  )
}
