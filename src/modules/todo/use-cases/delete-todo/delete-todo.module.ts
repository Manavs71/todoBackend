import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@wisemen/nestjs-typeorm'
import { DeleteTodoController } from './delete-todo.controller.js'
import { DeleteTodoUseCase } from './delete-todo.use-case.js'
import { Todo } from '../../entities/todo.entity.js'


@Module({
    imports: [
        TypeOrmModule.forFeature([Todo])
    ],
    controllers: [
        DeleteTodoController
    ],
    providers: [
        DeleteTodoUseCase
    ]
})
export class DeleteTodoModule { }
