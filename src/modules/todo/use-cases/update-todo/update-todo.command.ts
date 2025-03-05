import { IsDateString, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { IsNullable } from '@wisemen/validators'

export class UpdateTodoCommand {
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()

    @IsString()
    @IsNullable()
    description: string | null

    @ApiProperty()
    @IsDateString({ strict: true })
    @IsNullable()
    deadline: Date | null
}
