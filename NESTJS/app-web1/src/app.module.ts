import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//decoradores -> funciones
@Module({
  imports: [ //modulos importados

  ],
  controllers: [ // controladores de este modulo
      AppController
  ],
  providers: [ // servicios de este modulo
      AppService
  ],
  exports: [ // Servicios exportados
      AppService
  ],
})
export class AppModule {}
