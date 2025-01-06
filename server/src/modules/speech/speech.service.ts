import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import axios from 'axios';

@Injectable()
export class SpeechService {
  async transcribe(filePath: string): Promise<string> {
    // Replace this with the actual Whisper transcription code
    const mockTranscription = 'how many pokemons are there?';
    return mockTranscription;
  }

  async callOllama(text: string): Promise<string> {
    const response = await axios.post('http://127.0.0.1:11434/api/generate', {
      model: 'llama3.2',
      prompt: text,
    });

    const responseLines = response.data.split('\n');
    let formattedResponse = '';

    interface OllamaResponse {
      response: string;
    }

    responseLines.forEach((line: string) => {
      if (line.trim()) {
        const parsedLine: OllamaResponse = JSON.parse(line);
        formattedResponse += parsedLine.response;
      }
    });

    return formattedResponse;
  }
}
