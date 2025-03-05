import { Controller, Delete } from '@nestjs/common'
import { ApiOAuth2, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UuidParam } from '@wisemen/decorators'
import { Permission } from '../../../../modules/permission/permission.enum.js'
import { Permissions } from '../../../../modules/permission/permission.decorator.js'
import { DeleteTodoUseCase } from './delete-todo.use-case.js'

@ApiTags('Todo')
@Controller('todos/:uuid')
export class DeleteTodoController {
    constructor(
        private readonly deleteTodoUseCase: DeleteTodoUseCase
    ) { }

    @Delete()
    @ApiOkResponse()
    @Permissions(Permission.TODO_DELETE)
    public async deleteTodo(
        @UuidParam('uuid') uuid: string
    ): Promise<void> {
        await this.deleteTodoUseCase.execute(uuid)
    }
}
