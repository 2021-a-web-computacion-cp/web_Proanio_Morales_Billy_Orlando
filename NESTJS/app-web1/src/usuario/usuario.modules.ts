import { Module } from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {PrismaService} from "./prisma.services";
import {UsuarioController} from "./usuario.controller";

@Module({

        imports: [
            //modulos importados
        ],
        providers: [
            //declaracion de servicios
            UsuarioService,
            PrismaService,
        ],
        exports: [
            //exportamos servicios
            UsuarioService,
        ],
        controllers: [
            //descargamos controladore
            UsuarioController,
        ],
})

export class UsuarioModules {

}