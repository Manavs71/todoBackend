import { UpdateTodoCommand } from "../update-todo.command.js"

// create-todo-command.builder.ts
export class UpdateTodoCommandBuilder {
    private command: UpdateTodoCommand

    constructor() {
        this.reset()
    }

    reset() {
        this.command = new UpdateTodoCommand()
        this.command.title = 'Test Todo'

        return this
    }

    withTitle(title: string): this {
        this.command.title = title

        return this
    }

    withDescription(description: string | null): this {
        this.command.description = description

        return this
    }

    withDeadline(deadline: Date | null): this {
        this.command.deadline = deadline

        return this
    }


    build(): UpdateTodoCommand {
        const result = this.command;

        this.reset()

        return result
    }


}