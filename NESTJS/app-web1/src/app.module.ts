import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaService} from "./usuario/prisma.services";
import {UsuarioModules} from "./usuario/usuario.modules";

//decoradores -> funciones
@Module({
  imports: [ //modulos importados
      UsuarioModules,
  ],
  controllers: [ // controladores de este modulo
      AppController
  ],
  providers: [ // servicios de este modulo
      AppService,
      PrismaService,
  ],
  exports: [ // Servicios exportados
      AppService
  ],
})
export class AppModule {}
