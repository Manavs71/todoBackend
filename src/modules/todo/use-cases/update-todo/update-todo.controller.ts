import { Body, Controller, Put } from '@nestjs/common'
import { ApiTags, ApiOAuth2, ApiOkResponse } from '@nestjs/swagger'
import { UuidParam } from '@wisemen/decorators'
import { Permission } from '../../../../modules/permission/permission.enum.js'
import { Permissions } from '../../../../modules/permission/permission.decorator.js'
import { UpdateTodoUseCase } from './update-todo.use-case.js'
import { UpdateTodoCommand } from './update-todo.command.js'
import { AuthStorage } from '../../../auth/auth.storage.js'


@ApiTags('Todo')
@Controller('todos/:uuid')
export class UpdateTodoController {
    constructor(
        private readonly updateTodoUseCase: UpdateTodoUseCase,
        private readonly authStorage: AuthStorage,

    ) { }

    @Put()
    @ApiOkResponse()
    @Permissions(Permission.TODO_UPDATE)
    public async updateTodo(
        @UuidParam('uuid') uuid: string,
        @Body() command: UpdateTodoCommand
    ): Promise<void> {
        const userUuid = this.authStorage.getUserUuid();
        await this.updateTodoUseCase.execute(uuid, command, userUuid)
    }
}
