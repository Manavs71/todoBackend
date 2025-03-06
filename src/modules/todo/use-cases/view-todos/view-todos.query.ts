import { Equals, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { FilterQuery, PaginatedOffsetSearchQuery } from '@wisemen/pagination'

export class ViewTodoIndexFilterQuery extends FilterQuery {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  isActive?: string
}

export class ViewTodoIndexQuery extends PaginatedOffsetSearchQuery {
  @Equals(undefined)
  sort?: never

  @ApiProperty({ type: ViewTodoIndexFilterQuery, required: false })
  @IsOptional()
  @Type(() => ViewTodoIndexFilterQuery)
  @ValidateNested()
  filter?: ViewTodoIndexFilterQuery

  @Equals(undefined)
  search?: never
}
