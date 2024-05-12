import { Injectable, NotFoundException } from '@nestjs/common'
import {
  audioToTextUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases'
import {
  AudioToTextDto,
  ImageGenerationDto,
  ImageVariationDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos'
import OpenAI from 'openai'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  })

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    })
  }

  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt,
    })
  }

  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, {
      prompt,
    })
  }

  async translateText({ lang, prompt }: TranslateDto) {
    return await translateUseCase(this.openai, { lang, prompt })
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice })
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDto: AudioToTextDto,
  ) {
    const { prompt } = audioToTextDto

    return await audioToTextUseCase(this.openai, { audioFile, prompt })
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, imageGenerationDto)
  }

  getGeneratedImage(fileName: string) {
    const filePath = path.resolve('./', './generated/images/', fileName)
    const exists = fs.existsSync(filePath)

    if (!exists) {
      throw new NotFoundException('File not found')
    }

    return filePath
  }

  async generateImageVariation({ baseImage }: ImageVariationDto) {
    return imageVariationUseCase(this.openai, { baseImage })
  }
}
