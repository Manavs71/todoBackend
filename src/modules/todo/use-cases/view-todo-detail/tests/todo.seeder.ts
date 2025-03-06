import type { EntityManager } from 'typeorm'
import { TypeOrmRepository } from '@wisemen/nestjs-typeorm'
import { Todo } from '../../../entities/todo.entity.js'
import { AbstractSeeder } from '../../../../../../test/seeders/abstract-seeder.js'

export class TodoSeeder extends AbstractSeeder<Todo> {
  constructor (manager: EntityManager) {
    super(new TypeOrmRepository(Todo, manager))
  }
}
