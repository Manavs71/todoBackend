import { CreateTodoCommand } from "../create-todo.command.js"

// create-todo-command.builder.ts
export class CreateTodoCommandBuilder {
    private command: CreateTodoCommand

    constructor() {
        this.reset()
    }

    reset() {
        this.command = new CreateTodoCommand()
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


    build(): CreateTodoCommand {
        const result = this.command;

        this.reset()

        return result
    }


}