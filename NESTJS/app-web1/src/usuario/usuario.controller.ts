import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post, Query, Req,
    Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {validate} from "class-validator";
import {UsuarioCrearDto} from "./dto/usuario-crearDto";

@Controller( 'usuario')
export class UsuarioController{

    constructor(
        //inyeccion de dependencias
        private usuarioservice: UsuarioService
    ) {}

    @Get('inicio') // direccion url que accede
    inicio(@Res() response ){
        response.render('inicio.ejs'); // archivo que esat renderizando
    }

    @Get ('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta){
        response.render('usuario/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje
            }
        })
    }

    @Post('eliminar-usuario/:idUsuario')
    async eliminarUsuario(@Res() response, @Param() parametrosRuta){
        try {
            await this.usuarioservice.eliminarUno(+parametrosRuta.idUsuario);
            response.redirect(
                '/usuario/lista-usuarios' + '?mensaje= Se elimino el usuario'
            );
        } catch (error){
            console.log(error);
            throw new InternalServerErrorException('Error')
        }

    }


    @Post('crear-usuario-formulario')
    async CrearUsuarioFormulario(
        @Res() response,
        @Body() parametrosCuerpo
    ){
        try {
            const respuestaUsuario = await this.usuarioservice.crearUno( {
                nombre : parametrosCuerpo.nombre,
                apellido : parametrosCuerpo.apellido,
            });

            response.redirect ('vista-crear' + '?mensaje=Se creo el usuario' + " " +parametrosCuerpo.nombre)
         } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('error creando usuario')

        }
    }

    @Get('lista-usuarios') //direccion URL que accede
    async listaUsuarios(
        @Res() responses,
        @Query() parametrosConsulta,
    ){
        try {
            //validar con un dto
            const respuesta = await this.usuarioservice.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            console.log(respuesta);
            responses.render('usuario/lista', {
                datos : {
                    usuarios: respuesta,
                    mensaje: parametrosConsulta.mensaje
                },
            }); //paquete que esta renderizando
        }catch (error){
            throw new InternalServerErrorException(error)
        }

    }

    @Get(':idUsuario')
    obtenerUno(@Param() parametroRuta) {
        return this.usuarioservice.buscarUno(+parametroRuta.idUsuario);
    }

    @Post()
    async crearUno(@Body() parametrosCuerpo){
        const usuarioCrearDto = new UsuarioCrearDto();
        usuarioCrearDto.nombre = parametrosCuerpo.nombre;
        usuarioCrearDto.apellido = parametrosCuerpo.apellido;
        usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;

        try{
            const errores = await validate(usuarioCrearDto);
            if(errores.length>0){
                console.log(JSON.stringify(errores));
                throw new BadRequestException('No envia bien los parametross');
            }
            else{
                return this.usuarioservice.crearUno(usuarioCrearDto);
            }

        }catch (error){
            console.error({error: error, mensaje: 'Errores en crear usuario'});
            throw new InternalServerErrorException('error de servidor');
        }
    }
}