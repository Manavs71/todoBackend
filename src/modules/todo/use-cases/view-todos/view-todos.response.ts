import { ApiProperty } from '@nestjs/swagger'
import { PaginatedOffsetResponse } from '@wisemen/pagination'
import { Todo } from '../../entities/todo.entity.js'

class TodoResponse {
  @ApiProperty({ type: String, format: 'uuid' })
  uuid: string

  @ApiProperty({ type: String, example: 'string' })
  title: string

  @ApiProperty({ type: String, nullable: true, example: 'string' })
  description: string | null

  @ApiProperty({ type: String, nullable: true, example: 'YYYY-MM-DD' })
  deadline: string | null

  constructor (todo: Todo) {
    this.uuid = todo.uuid
    this.title = todo.title
    this.description = todo.description
    this.deadline = todo.deadline?.toISOString() ?? null
  }
}

export class ViewTodoIndexResponse extends PaginatedOffsetResponse<TodoResponse> {
  @ApiProperty({ type: TodoResponse, isArray: true })
  declare items: TodoResponse[]

  constructor (items: Todo[], total: number, limit: number, offset: number) {
    const result = items.map(todo => new TodoResponse(todo))

    super(result, total, limit, offset)
  }
}
