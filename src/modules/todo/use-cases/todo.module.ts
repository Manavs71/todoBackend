import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@wisemen/nestjs-typeorm'
import { CreateTodoModule } from './create-todo/create-todo.module.js'

@Module({
    imports: [
        TypeOrmModule.forFeature([
        ]),
        CreateTodoModule
    ],
    providers: [],
    exports: []
})
export class TodoModule { }
