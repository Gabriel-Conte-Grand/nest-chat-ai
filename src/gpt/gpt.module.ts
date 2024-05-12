import { GptService } from './gpt.service'
import { GptController } from './gpt.controller'
import { Module } from '@nestjs/common'

@Module({
  controllers: [GptController],
  providers: [GptService],
})
export class GptModule {}
