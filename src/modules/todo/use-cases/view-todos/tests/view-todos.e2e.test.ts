import { before, describe, after, it } from 'node:test'
import request from 'supertest'
import { expect } from 'expect'
import type { DataSource } from 'typeorm'
import { EndToEndTestSetup } from '../../../../../../test/setup/end-to-end-test-setup.js'
import { TestBench } from '../../../../../../test/setup/test-bench.js'
import { RoleEntityBuilder } from '../../../../../app/roles/tests/builders/entities/role-entity.builder.js'
import { UserRoleEntityBuilder } from '../../../../../app/roles/tests/builders/entities/user-role-entity.builder.js'
import { RoleSeeder } from '../../../../../app/roles/tests/seeders/role.seeder.js'
import { UserRoleSeeder } from '../../../../../app/roles/tests/seeders/user-role.seeder.js'
import { TestUser } from '../../../../../app/users/tests/setup-user.type.js'
import { UserEntityBuilder } from '../../../../../app/users/tests/user-entity.builder.js'
import { UserSeeder } from '../../../../../app/users/tests/user.seeder.js'
import { Permission } from '../../../../permission/permission.enum.js'

describe('View todos end to end tests', () => {
  let setup: EndToEndTestSetup
  let dataSource: DataSource
  let adminUser: TestUser
  let defaultUser: TestUser

  before(async () => {
    setup = await TestBench.setupEndToEndTest()
    dataSource = setup.dataSource
    adminUser = await setup.authContext.getAdminUser()
    defaultUser = await setup.authContext.getDefaultUser()
  })
  after(async () => {
    await setup.teardown()
  })
  describe('Get todos', () => {
    it('should return 401 when not authenticated', async () => {
      const response = await request(setup.httpServer)
        .get('/todos')

      expect(response).toHaveStatus(401)
    })
    it('should return 403 when not authorized', async () => {
      const response = await request(setup.httpServer)
        .get('/todos')
        .set('Authorization', `Bearer ${defaultUser.token}`)

      expect(response).toHaveStatus(403)
    })
    it('should return todos when admin', async () => {
      const response = await request(setup.httpServer)
        .get('/todos')
        .set('Authorization', `Bearer ${adminUser.token}`)

      expect(response).toHaveStatus(200)
    })
    it('should return todos when having TODO_READ permission', async () => {
      const role = await new RoleSeeder(dataSource.manager).seedOne(
        new RoleEntityBuilder()
          .withName('should-return-todos-when-having-todo-read-permission')
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
          .withRoleUuid(role.uuid)
          .build()
      )

      const token = setup.authContext.getToken(user)
      const response = await request(setup.httpServer)
        .get('/todos')
        .set('Authorization', `Bearer ${token}`)

      expect(response).toHaveStatus(200)
    })
  })
})
