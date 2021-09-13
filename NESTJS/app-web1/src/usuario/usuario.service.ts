import {Injectable} from '@nestjs/common'
import {PrismaService} from "./prisma.services";
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuarioService{
    //constructor para inyectar dependencias
    constructor(
        private prisma: PrismaService
    ) {
    }

    buscarUno(id: number){
        this.prisma.ePN_USUARIO.findUnique({
            where: {
                id: id,
            },
        });
    }

    crearUno(usuario: Prisma.EPN_USUARIOCreateInput) {
        return this.prisma.ePN_USUARIO.create({
            data: usuario,
        });
    }

    actualizarUno(parametrosActualizar:{
        where: Prisma.EPN_USUARIOWhereUniqueInput,
        data: Prisma.EPN_USUARIOUpdateInput;
    }){
        return this.prisma.ePN_USUARIO.update({
            data: parametrosActualizar.data,
            where: parametrosActualizar.where,
        });
    }

    eliminarUno(where: Prisma.EPN_USUARIOWhereUniqueInput){
        return this.prisma.ePN_USUARIO.delete({
            where: where,
        });
    }


}