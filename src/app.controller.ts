import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import type { Response } from 'express';
import data from './data/transactions.json';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('image/codekhane')
  getImage(@Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'public', 'codekhane.jpeg'));
  }
  @Get('transactions')
  application(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(data);
  }
}
