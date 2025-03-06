import { before, describe, it, after } from 'node:test'
import request from 'supertest'
import { expect } from 'expect'
import type { DataSource } from 'typeorm'
import { EndToEndTestSetup } from '../../../../../../test/setup/end-to-end-test-setup.js'
import { TestAuthContext } from '../../../../../../test/utils/test-auth-context.js'
import { TestUser } from '../../../../../app/users/tests/setup-user.type.js'
import { Todo } from '../../../entities/todo.entity.js'
import { TestBench } from '../../../../../../test/setup/test-bench.js'
import { RoleEntityBuilder } from '../../../../../app/roles/tests/builders/entities/role-entity.builder.js'
import { UserRoleEntityBuilder } from '../../../../../app/roles/tests/builders/entities/user-role-entity.builder.js'
import { RoleSeeder } from '../../../../../app/roles/tests/seeders/role.seeder.js'
import { UserRoleSeeder } from '../../../../../app/roles/tests/seeders/user-role.seeder.js'
import { UserEntityBuilder } from '../../../../../app/users/tests/user-entity.builder.js'
import { UserSeeder } from '../../../../../app/users/tests/user.seeder.js'
import { Permission } from '../../../../permission/permission.enum.js'
import { TodoSeeder } from './todo.seeder.js'
import { TodoEntityBuilder } from './todo-entity. builder.js'

describe('Todos', () => {
  let setup: EndToEndTestSetup
  let dataSource: DataSource
  let context: TestAuthContext
  let adminUser: TestUser
  let defaultUser: TestUser
  let todo: Todo

  before(async () => {
    setup = await TestBench.setupEndToEndTest()
    dataSource = setup.dataSource
    context = setup.authContext
    adminUser = await context.getAdminUser()
    defaultUser = await context.getDefaultUser()
    todo = await new TodoSeeder(dataSource.manager).seedOne(
      new TodoEntityBuilder()
        .withTitle('should-update-todo')
        .withUserUuid(defaultUser.user.userId)
        .build()
    )
  })
  after(async () => await setup.teardown())
  describe('Get todo', () => {
    it('should return 401 when not authenticated', async () => {
      const response = await request(setup.httpServer)
        .get(`/todos/${todo.uuid}`)

      expect(response).toHaveStatus(401)
    })
    it('should return 403 when not authorized', async () => {
      const response = await request(setup.httpServer)
        .get(`/todos/${todo.uuid}`)
        .set('Authorization', `Bearer ${defaultUser.token}`)

      expect(response).toHaveStatus(403)
    })
    it('should return todo when admin', async () => {
      const response = await request(setup.httpServer)
        .get(`/todos/${todo.uuid}`)
        .set('Authorization', `Bearer ${adminUser.token}`)

      expect(response).toHaveStatus(200)
    })
    it('should return todo when having TODO_READ permission', async () => {
      const roleReadRole = await new RoleSeeder(dataSource.manager).seedOne(
        new RoleEntityBuilder()
          .withName('should-return-todo-when-having-todo-read-permission')
          .withPermissions([Permission.TODO_READ])
          .build()
      )
      const user = await new UserSeeder(dataSource.manager).seedOne(
        new UserEntityBuilder()
          .build()
      )

      await new UserRoleSeeder(dataSource.manager).seedOne(
        new UserRoleEntityBuilder()
          .withUserUuid(user.uuid)
          .withRoleUuid(roleReadRole.uuid)
          .build()
      )

      const token = context.getToken(user)
      const response = await request(setup.httpServer)
        .get(`/todos/${todo.uuid}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response).toHaveStatus(200)
    })
  })
})
