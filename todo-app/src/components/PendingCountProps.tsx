interface PendingCountProps {
  count: number
}

export function PendingCount({ count }: PendingCountProps) {
  return (
    <p className="pending-count" aria-live="polite" aria-atomic="true">
      Tareas pendientes: {count}
    </p>
  )
}
