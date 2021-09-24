import { UsuarioService } from "./usuario.service";
export declare class UsuarioController {
    private usuarioservice;
    constructor(usuarioservice: UsuarioService);
    inicio(response: any): void;
    vistaCrear(response: any, parametrosConsulta: any): void;
    eliminarUsuario(response: any, parametrosRuta: any): Promise<void>;
    CrearUsuarioFormulario(response: any, parametrosCuerpo: any): Promise<void>;
    listaUsuarios(responses: any, parametrosConsulta: any): Promise<void>;
    obtenerUno(parametroRuta: any): void;
    crearUno(parametrosCuerpo: any): Promise<import(".prisma/client").EPN_USUARIO>;
}
