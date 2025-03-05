// create-todo.command.ts
import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class CreateTodoCommand {
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()

    @IsString()
    description: string | null

    @ApiProperty()
    @IsDateString({ strict: true })
    deadline: Date | null
}