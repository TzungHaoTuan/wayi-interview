import { Key } from "react"

export interface Task {
    id: Key
    name: string
    description: string
    is_completed: boolean
    created_at: Date
    updated_at: Date
}