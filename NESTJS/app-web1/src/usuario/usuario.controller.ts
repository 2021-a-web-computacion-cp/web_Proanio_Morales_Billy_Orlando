import {Controller, Get, Param} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller( 'usuario')
export class UsuarioController{

    constructor(
        //inyeccion de dependencias
        private usuarioservice: UsuarioService
    ) {}

    @Get(':idUsuario')
    obtenerUno(@Param() parametroRuta) {
        return this.usuarioservice.buscarUno(+parametroRuta.idUsuario);
    }
}