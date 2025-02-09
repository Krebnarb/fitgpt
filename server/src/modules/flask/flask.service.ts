import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FlaskService {
  constructor(private readonly httpService: HttpService) {}

  async getHelloMessage(): Promise<any> {
    const response = await lastValueFrom(this.httpService.get('http://backend-flask:5000/hello'));
    return response;
  }
}
