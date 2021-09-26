import {Injectable} from '@nestjs/common'
import {PrismaService} from "./prisma.service";
import { Prisma } from '@prisma/client';

@Injectable()
export class EmpresaService{
    //constructor para inyectar dependencias
    constructor(
        private prisma: PrismaService
    ) {
    }
    buscarMuchos(
        parametrosBusqueda:
            {   skip?: number;
                take?: number;
                busqueda?: string;
                // orderBy?: Prisma.EPN_UsuarioOrder;
            }) {
        const or = parametrosBusqueda.busqueda ? {
                OR: [ { razonSocila: { contains: parametrosBusqueda.busqueda } },
                    { ruc: { contains: parametrosBusqueda.busqueda } },
                ], } :
            {}; return this.prisma.eMPRESA.findMany(
            {   where: or, take: Number(parametrosBusqueda.take) || undefined,
                skip: Number(parametrosBusqueda.skip) || undefined,
            });
    }



    buscarUno(id: number){
        this.prisma.eMPRESA.findUnique({
            where: {
                id: id,
            },
        });
    }

    crearUno(empresa: Prisma.EMPRESACreateInput) {
        return this.prisma.eMPRESA.create({
            data: empresa,
        });
    }

    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.EPN_USUARIOUpdateInput;
    }) {
        return this.prisma.ePN_USUARIO.update({
            data: parametrosActualizar.data,
            where: {
                id: parametrosActualizar.id,
            },
        });
    }

    eliminarUno(id: number) {
        return this.prisma.eMPRESA.delete({
            where: { id: +id },
        });
    }

}