import { randomUUID } from 'node:crypto'
import { Todo } from '../../../entities/todo.entity.js'

export class TodoEntityBuilder {
  private todoEntity: Todo
  constructor () {
    this.reset()
  }

  reset (): this {
    this.todoEntity = new Todo()
    this.todoEntity.userUuid = randomUUID()
    this.todoEntity.title = 'test-todo'
    this.todoEntity.description = 'description'
    this.todoEntity.completed = false

    return this
  }

  withUserUuid (userUuid: string): this {
    this.todoEntity.userUuid = userUuid

    return this
  }

  withTitle (title: string): this {
    this.todoEntity.title = title

    return this
  }

  withDeadline (deadlineAt: Date): this {
    this.todoEntity.deadline = deadlineAt

    return this
  }

  withDescription (description: string): this {
    this.todoEntity.description = description

    return this
  }

  withCompleted (isCompleted: boolean): this {
    this.todoEntity.completed = isCompleted

    return this
  }

  build (): Todo {
    const result = this.todoEntity

    this.reset()

    return result
  }
}
