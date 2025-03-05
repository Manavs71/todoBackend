import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@wisemen/nestjs-typeorm'
import { CreateTodoModule } from './create-todo/create-todo.module.js'
import { UpdateTodoModule } from './update-todo/update-todo.module.js'

@Module({
    imports: [
        TypeOrmModule.forFeature([
        ]),
        CreateTodoModule,
        UpdateTodoModule,
    ],
    providers: [],
    exports: []
})
export class TodoModule { }
