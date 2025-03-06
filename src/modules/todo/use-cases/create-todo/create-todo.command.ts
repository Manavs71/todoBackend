// create-todo.command.ts
import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'
import { IsNullable } from '@wisemen/validators'

export class CreateTodoCommand {
  @ApiProperty({ type: String, example: 'string' })
  @IsNotEmpty()
  title: string

  @ApiProperty({ type: String, nullable: true, example: 'string' })
  @IsString()
  @IsNullable()
  description: string | null

  @ApiProperty({ type: String, nullable: true, example: 'YYYY-MM-DD' })
  @IsDateString({ strict: true })
  @IsNullable()
  deadline: Date | null
}
