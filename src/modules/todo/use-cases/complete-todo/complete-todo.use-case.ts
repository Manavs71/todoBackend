import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../../entities/todo.entity.js'

@Injectable()
export class CompleteTodoUseCase {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>
    ) { }

    public async execute(
        uuid: string,
    ): Promise<void> {
        await this.todoRepository.findOneByOrFail({ uuid })


        await this.todoRepository.update({
            uuid
        }, {
            completed: true,
        })
    }
}
