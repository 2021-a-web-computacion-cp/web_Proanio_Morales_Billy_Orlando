import { PrismaService } from "./prisma.services";
import { Prisma } from '@prisma/client';
export declare class UsuarioService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): void;
    crearUno(usuario: Prisma.EPN_USUARIOCreateInput): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.EPN_USUARIOUpdateInput;
    }): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    eliminarUno(id: number): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
}
