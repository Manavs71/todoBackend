import { Todo } from "../../entities/todo.entity.js"

// create-todo.response.ts
export class CreateTodoResponse {
    uuid: string
    createdAt: Date,
    updatedAt: Date,
    title: string,
    description: string | null ,
    deadline: string | null,
    completed: boolean

    constructor(todo: Todo) {
        this.uuid = todo.uuid
        this.createdAt = todo.createdAt
        this.updatedAt = todo.updatedAt
        this.title = todo.title
        this.description = todo.description
        this.deadline = todo.deadline?.toISOString() ?? null
        this.completed = todo.completed
    }
}