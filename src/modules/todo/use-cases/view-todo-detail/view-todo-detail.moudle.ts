import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@wisemen/nestjs-typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { ViewTodoDetailUseCase } from './view-todo-detail.use-case.js'
import { ViewTodoDetailController } from './view-todo-detail.controller.js'

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo])
  ],
  controllers: [
    ViewTodoDetailController
  ],
  providers: [
    ViewTodoDetailUseCase
  ]
})
export class ViewTodoDetailModule { }
