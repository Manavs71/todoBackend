import { IsDateString, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { IsNullable } from '@wisemen/validators'

export class UpdateTodoCommand {
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
