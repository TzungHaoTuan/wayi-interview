import { Key } from "react"

export interface Task {
    id: Key
    name: String
    description: String
    is_completed: Boolean
    created_at: String
    updated_at: String
}