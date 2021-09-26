import { Module } from '@nestjs/common';
import {EmpresaService} from "./empresa.service";
import {PrismaService} from "./prisma.service";
import {EmpresaController} from "./empresa.controller";

@Module({

    imports: [
        //modulos importados
    ],
    providers: [
        //declaracion de servicios
        EmpresaService,
        PrismaService,
    ],
    exports: [
        //exportamos servicios
        EmpresaService,
    ],
    controllers: [
        //descargamos controladore
        EmpresaController,
    ],
})

export class EmpresaModules {

}