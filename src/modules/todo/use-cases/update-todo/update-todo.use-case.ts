import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Repository } from 'typeorm'
import { UpdateTodoCommand } from './update-todo.command.js'
import { Todo } from '../../entities/todo.entity.js'

@Injectable()
export class UpdateTodoUseCase {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>
    ) { }

    public async execute(
        uuid: string,
        command: UpdateTodoCommand,
        userUuid: string
    ): Promise<void> {
        await this.todoRepository.findOneByOrFail({ uuid })


        await this.todoRepository.update({
            uuid
        }, {
            title: command.title,
            description: command.description,
            deadline: command.deadline === null
                ? null
                : new Date(command.deadline),
            userUuid
        })
    }
}
