import { Module } from '@nestjs/common'

import { CreateTodoModule } from './create-todo/create-todo.module.js'
import { UpdateTodoModule } from './update-todo/update-todo.module.js'
import { DeleteTodoModule } from './delete-todo/delete-todo.module.js'
import { CompleteTodoModule } from './complete-todo/complete-todo.module.js'
import { UnCompleteTodoModule } from './uncomplete-todo/uncomplete-todo.module.js'
import { ViewTodoIndexModule } from './view-todos/view-todos.module.js'
import { ViewTodoDetailModule } from './view-todo-detail/view-todo-detail.moudle.js'

@Module({
  imports: [
    CreateTodoModule,
    UpdateTodoModule,
    DeleteTodoModule,
    CompleteTodoModule,
    UnCompleteTodoModule,
    ViewTodoIndexModule,
    ViewTodoDetailModule
  ],
  providers: [],
  exports: []
})
export class TodoModule { }
