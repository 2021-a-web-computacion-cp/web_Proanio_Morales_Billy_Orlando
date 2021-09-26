import { PrismaService } from "./prisma.service";
import { Prisma } from '@prisma/client';
export declare class EmpresaService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").EMPRESA[]>;
    buscarUno(id: number): void;
    crearUno(empresa: Prisma.EMPRESACreateInput): Prisma.Prisma__EMPRESAClient<import(".prisma/client").EMPRESA>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.EPN_USUARIOUpdateInput;
    }): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    eliminarUno(id: number): Prisma.Prisma__EMPRESAClient<import(".prisma/client").EMPRESA>;
}
