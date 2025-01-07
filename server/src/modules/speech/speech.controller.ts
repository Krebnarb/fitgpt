import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SpeechService } from './speech.service';
import { Express } from 'express';

@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  @Post('transcribe')
  @UseInterceptors(FileInterceptor('audio'))
  async transcribeAudio(@UploadedFile() file: Express.Multer.File) {
    const path = file && file.path || '';
    const transcription = await this.speechService.transcribe(path);
    const ollamaResponse = await this.speechService.callOllama(transcription);
    return { transcription, ollamaResponse };
  }

  @Post('prompt')
  async promptOllama(@Body('transcription') transcription: string) {
    const ollamaResponse = await this.speechService.callOllama(transcription);
    return { ollamaResponse };
  }
}
