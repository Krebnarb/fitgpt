import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot!: TelegramBot;

  onModuleInit() {
    const token = process.env.TELEGRAM_API_KEY;
    if (!token) {
      throw new Error('TELEGRAM_API_KEY is not defined in the environment variables');
    }
    
    this.bot = new TelegramBot(token, { polling: true });

    // Handle incoming messages
    this.bot.on('message', (msg:any) => {
      const chatId = msg.chat.id;
      const text = msg.text;

      // Example: Echo the received message
      console.log(`Received message: ${msg.chat.id}`);
      this.sendMessage(chatId, `You said: ${text}.  YOU DONE MESSED UP A-A-RON!`);
    });
  }

  sendMessage(chatId: number, message: string) {
    return this.bot.sendMessage(chatId, message);
  }
}
