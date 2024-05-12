import { IsInt, IsString, IsOptional } from 'class-validator'

export class ProsConsDiscusserDto {
  @IsString()
  readonly prompt: string

  @IsInt()
  @IsOptional()
  readonly maxTokens?: number
}
