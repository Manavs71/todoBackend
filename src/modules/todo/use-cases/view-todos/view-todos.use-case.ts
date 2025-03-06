import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Repository } from 'typeorm'
import { SortDirection, typeormPagination } from '@wisemen/pagination'
import { Todo } from '../../entities/todo.entity.js'
import { ViewTodoIndexQuery } from './view-todos.query.js'
import { ViewTodoIndexResponse } from './view-todos.response.js'

@Injectable()
export class ViewTodoIndexUseCase {
  constructor (
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) { }

  public async execute (
    query: ViewTodoIndexQuery
  ): Promise<ViewTodoIndexResponse> {
    const pagination = typeormPagination(query.pagination)

    const [items, count] = await this.todoRepository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      order: { uuid: SortDirection.ASC }
    })

    return new ViewTodoIndexResponse(
      items,
      count,
      pagination.take,
      pagination.skip
    )
  }
}
