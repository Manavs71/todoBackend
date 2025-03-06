import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { UuidParam } from '@wisemen/decorators'
import { Permission } from '../../../../modules/permission/permission.enum.js'
import { Permissions } from '../../../../modules/permission/permission.decorator.js'
import { ViewTodoDetailUseCase } from './view-todo-detail.use-case.js'
import { ViewTodoDetailResponse } from './view-todo-detail.response.js'

@ApiTags('Todo')
@Controller('todos/:uuid')
export class ViewTodoDetailController {
  constructor (
    private readonly viewTodoDetailUseCase: ViewTodoDetailUseCase
  ) { }

  @Get()
  @Permissions(Permission.TODO_READ)
  @ApiOkResponse({ type: ViewTodoDetailResponse })
  public async viewTodoDetail (
    @UuidParam('uuid') uuid: string
  ): Promise<ViewTodoDetailResponse> {
    return this.viewTodoDetailUseCase.execute(uuid)
  }
}
