import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { PassSpec } from './dataTypes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/index')
  @Render('index')
  getIndexView() {}

  @Post('/generatePassword')
  generatePassword(@Body() passSpec: PassSpec): string {
    return JSON.stringify({ data: this.appService.generatePass(passSpec) });
  }
}
