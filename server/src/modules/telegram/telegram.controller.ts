import { Controller, Post, Body } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('send-message')
  async sendMessage(@Body() body: { chatId: number; message: string }) {
    const { chatId, message } = body;
    return this.telegramService.sendMessage(chatId, message);
  }
}
