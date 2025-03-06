import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@wisemen/nestjs-typeorm'

import { Todo } from '../../entities/todo.entity.js'
import { ViewTodoIndexController } from './view-todos.controller.js'
import { ViewTodoIndexUseCase } from './view-todos.use-case.js'

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo])
  ],
  controllers: [
    ViewTodoIndexController
  ],
  providers: [
    ViewTodoIndexUseCase
  ]
})
export class ViewTodoIndexModule { }
