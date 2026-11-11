interface PendingCountProps {
    count:number
}

export function PendingCount({ count }: PendingCountProps) {
    return <p>Tareas pendientes: {count}</p>
}