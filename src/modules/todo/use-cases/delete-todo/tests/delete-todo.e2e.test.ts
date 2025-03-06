import { before, describe, after, it } from 'node:test'
import request from 'supertest'
import { expect } from 'expect'
import { EndToEndTestSetup } from '../../../../../../test/setup/end-to-end-test-setup.js'
import { TestUser } from '../../../../../app/users/tests/setup-user.type.js'
import { TestBench } from '../../../../../../test/setup/test-bench.js'
import { TestAuthContext } from '../../../../../../test/utils/test-auth-context.js'
import { CreateTodoCommandBuilder } from '../../create-todo/tests/create-todo-command.builder.js'
import { Todo } from '../../../entities/todo.entity.js'

describe('Update todo end to end tests', () => {
    let setup: EndToEndTestSetup
    let context: TestAuthContext
    let adminUser: TestUser
    let defaultUser: TestUser
    let createdTodo: Todo

    before(async () => {
        setup = await TestBench.setupEndToEndTest()
        context = setup.authContext
        adminUser = await context.getAdminUser()
        defaultUser = await context.getDefaultUser()

        const todoDto = new CreateTodoCommandBuilder()
            .withTitle('Test Todo')
            .withDescription('Test Description')
            .withDeadline(new Date())
            .build()
        const response = await request(setup.httpServer)
            .post('/todos')
            .set('Authorization', `Bearer ${adminUser.token}`)
            .send(todoDto)
        console.log('responsebody::', response.body)

        createdTodo = response.body;
    })

    after(async () => {
        await setup.teardown()
    })

    describe('delete todo', () => {
        it('should return 401 when not authenticated', async () => {
            const response = await request(setup.httpServer)
                .delete(`/todos/${createdTodo.uuid}`)
            expect(response).toHaveStatus(401)
        })

        it('should return 403 when not authorized', async () => {
            const response = await request(setup.httpServer)
                .delete(`/todos/${createdTodo.uuid}`)
                .set('Authorization', `Bearer ${defaultUser.token}`)
                .send({})
            expect(response).toHaveStatus(403)
        })

        it('should return 200 when the todo is deleted', async () => {
            const response = await request(setup.httpServer)
                .delete(`/todos/${createdTodo.uuid}`)
                .set('Authorization', `Bearer ${adminUser.token}`)
            expect(response).toHaveStatus(200)
        })
    })
})