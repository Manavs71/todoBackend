// src/modules/todo/entities/todo.entity.ts

import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, Relation } from 'typeorm'
import { User } from '../../../app/users/entities/user.entity.js'

@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @ManyToOne(() => User, user => user.todos)
    @JoinColumn({ name: 'userUuid' })
    user?: Relation<User>

    @CreateDateColumn({ precision: 3 })
    createdAt: Date

    @UpdateDateColumn({ precision: 3 })
    updatedAt: Date

    @DeleteDateColumn({ precision: 3 })
    deletedAt: Date

    @Column({ type: 'varchar' })
    title: string

    @Column({ type: 'varchar', nullable: true })
    description: string | null

    @Column({ type: 'timestamp', precision: 3, nullable: true })
    deadline: Date | null

    @Column({ type: 'boolean', default: false })
    completed: boolean
}