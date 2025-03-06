import { Controller, Post } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { UuidParam } from '@wisemen/decorators'
import { Permission } from '../../../../modules/permission/permission.enum.js'
import { Permissions } from '../../../../modules/permission/permission.decorator.js'

import { CompleteTodoUseCase } from './complete-todo.use-case.js'

@ApiTags('Todo')
@Controller('todos/:uuid/complete')
export class CompleteTodoController {
  constructor (
    private readonly completetTodoUseCase: CompleteTodoUseCase

  ) { }

  @Post()
  @ApiOkResponse()
  @Permissions(Permission.TODO_COMPLETE)
  public async updateTodo (
        @UuidParam('uuid') uuid: string
  ): Promise<void> {
    await this.completetTodoUseCase.execute(uuid)
  }
}
