import { UsuarioService } from "./usuario.service";
export declare class UsuarioController {
    private usuarioservice;
    constructor(usuarioservice: UsuarioService);
    obtenerUno(parametroRuta: any): void;
    crearUno(parametrosCuerpo: any): Promise<import(".prisma/client").EPN_USUARIO>;
}
