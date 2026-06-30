import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return {
      app: 'Dashboard Backend',
      version: 'RUNFLARE-TEST-999',
      status: 'OK',
    };
  }

  @Get('test123')
  test() {
    return {
      ok: true,
      message: 'NestJS is running',
    };
  }
}