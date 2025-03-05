import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreateTodoUseCase } from "./create-todo.use-case.js";
import { CreateTodoResponse } from "./create-todo.response.js";
import { CreateTodoCommand } from "./create-todo.command.js";
import { Permission } from '../../../../modules/permission/permission.enum.js'
import { Permissions } from '../../../../modules/permission/permission.decorator.js'
import { AuthStorage } from "../../../auth/auth.storage.js";

// create-todo.controller.ts
@ApiTags('Todo')
@Controller('todos')
export class CreateTodoController {
    constructor(
        private createTodoUseCase: CreateTodoUseCase,
        private readonly authStorage: AuthStorage,
    ) { }

    @Post()
    @ApiCreatedResponse({ type: CreateTodoResponse })
    @Permissions(Permission.TODO_CREATE)
    async createTodo(
        @Body() createTodoCommand: CreateTodoCommand,
    ): Promise<CreateTodoResponse> {
        const userUuid = this.authStorage.getUserUuid();
        return this.createTodoUseCase.execute(createTodoCommand, userUuid)
    }
}