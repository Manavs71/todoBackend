import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { ViewTodoDetailResponse } from './view-todo-detail.response.js'

@Injectable()
export class ViewTodoDetailUseCase {
  constructor (
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) {}

  public async execute (uuid: string): Promise<ViewTodoDetailResponse> {
    const contact = await this.todoRepository.findOneByOrFail({
      uuid
    })

    return new ViewTodoDetailResponse(contact)
  }
}
