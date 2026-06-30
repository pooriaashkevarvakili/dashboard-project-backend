import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('test123')
  test() {
    return {
      ok: true,
      message: 'NestJS is running',
    };
  }
}