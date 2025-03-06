import { Controller, Post } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { UuidParam } from '@wisemen/decorators'
import { Permission } from '../../../../modules/permission/permission.enum.js'
import { Permissions } from '../../../../modules/permission/permission.decorator.js'

import { UnCompleteTodoUseCase } from './uncomplete-todo.use-case.js'

@ApiTags('Todo')
@Controller('todo/:uuid/uncomplete')
export class UnCompleteTodoController {
  constructor (
    private readonly unCompletetTodoUseCase: UnCompleteTodoUseCase
  ) { }

  @Post()
  @ApiOkResponse()
  @Permissions(Permission.TODO_UNCOMPLETE)
  public async updateTodo (
        @UuidParam('uuid') uuid: string
  ): Promise<void> {
    await this.unCompletetTodoUseCase.execute(uuid)
  }
}
