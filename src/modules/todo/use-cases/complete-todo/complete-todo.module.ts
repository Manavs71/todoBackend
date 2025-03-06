import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@wisemen/nestjs-typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { CompleteTodoController } from './complete-todo.controller.js'
import { CompleteTodoUseCase } from './complete-todo.use-case.js'

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo])
  ],
  controllers: [
    CompleteTodoController
  ],
  providers: [
    CompleteTodoUseCase
  ]
})
export class CompleteTodoModule { }
