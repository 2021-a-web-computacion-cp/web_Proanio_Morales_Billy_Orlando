import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('texto')
  holaTexto(): string{
    return 'HOLA TEXTO ';
  }

  @Get('html')
  holaHTML(): string{
    return '<h1> hola HTML </h1>';
  }

  @Get('json')
  holaJson(): string{
    return '{mensaje: "Hola Json"}';
  }


}
