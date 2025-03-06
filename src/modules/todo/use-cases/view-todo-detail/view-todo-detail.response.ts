import { ApiProperty } from '@nestjs/swagger'
import { Todo } from '../../entities/todo.entity.js'

export class ViewTodoDetailResponse {
  @ApiProperty({ type: String, format: 'uuid' })
  uuid: string

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: Date

  @ApiProperty({ type: String, example: 'string' })
  title: string

  @ApiProperty({ type: String, nullable: true, example: 'string' })
  description: string | null

  @ApiProperty({ type: String, nullable: true, example: 'YYYY-MM-DD' })
  deadline: string | null

  @ApiProperty({ type: Boolean, example: false })
  completed: boolean

  constructor (todo: Todo) {
    this.uuid = todo.uuid
    this.createdAt = todo.createdAt
    this.updatedAt = todo.updatedAt
    this.title = todo.title
    this.description = todo.description
    this.deadline = todo.deadline?.toISOString() ?? null
    this.completed = todo.completed
  }
}
