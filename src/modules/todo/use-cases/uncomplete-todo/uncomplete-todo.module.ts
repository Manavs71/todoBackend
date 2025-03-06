import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@wisemen/nestjs-typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { UnCompleteTodoUseCase } from './uncomplete-todo.use-case.js'
import { UnCompleteTodoController } from './uncomplete-todo.controller.js'

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo])
  ],
  controllers: [
    UnCompleteTodoController
  ],
  providers: [
    UnCompleteTodoUseCase
  ]
})
export class UnCompleteTodoModule { }
