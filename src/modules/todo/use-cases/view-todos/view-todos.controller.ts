import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { Permission } from '../../../../modules/permission/permission.enum.js'
import { Permissions } from '../../../../modules/permission/permission.decorator.js'
import { ViewTodoIndexUseCase } from './view-todos.use-case.js'
import { ViewTodoIndexQuery } from './view-todos.query.js'
import { ViewTodoIndexResponse } from './view-todos.response.js'

@ApiTags('Todo')
@Controller('todos')
export class ViewTodoIndexController {
  constructor (
    private readonly viewtodoIndexUseCase: ViewTodoIndexUseCase
  ) { }

  @Get()
  @Permissions(Permission.TODO_READ)
  @ApiOkResponse({ type: ViewTodoIndexResponse })
  public async viewTodoIndex (
    @Query() query: ViewTodoIndexQuery
  ): Promise<ViewTodoIndexResponse> {
    return this.viewtodoIndexUseCase.execute(query)
  }
}
