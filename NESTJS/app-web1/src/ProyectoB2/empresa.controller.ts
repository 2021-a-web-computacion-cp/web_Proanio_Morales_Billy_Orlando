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
import {EmpresaService} from "./empresa.service";
import {validate} from "class-validator";
import {EmpresaCrearDTO} from "./dto/empresa-crearDTO";
import {EmpresaEditarDTO} from "./dto/empresa-actualizarDTO";


@Controller( 'empresa')
export class EmpresaController{

    constructor(
        //inyeccion de dependencias
        private EmpresaServices: EmpresaService
    ) {}

    @Get('inicio') // direccion url que accede
    inicio(@Res() response ){
        response.render('proyecto/inicioProyecto.ejs'); // archivo que esat renderizando
    }

    @Get ('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta){
        response.render('proyecto/empresa/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje
            }
        })
    }



    @Post('eliminar-empresa/:idEmpresa')
    async eliminarEmpresas(@Res() response, @Param() parametrosRuta){
        try {
            await this.EmpresaServices.eliminarUno(+parametrosRuta.idEmpresa);
            response.redirect(
                '/empresa/lista-empresas' + '?mensaje= Se elimino la empresa'
            );
        } catch (error){
            console.log(error);
            throw new InternalServerErrorException('Error')
        }

    }


    @Post('crear-empresa-formulario')
    async CrearEmpresaFormulario(
        @Res() response,
        @Body() parametrosCuerpo
    ){
        try {
            const respuestaEmpresa = await this.EmpresaServices.crearUno( {
                razonSocial : parametrosCuerpo.razonSocial,
                ruc : parametrosCuerpo.ruc,
                telefono: +parametrosCuerpo.telefono,
                activo: parametrosCuerpo.activo
            });
            response.redirect ('/empresa/lista-empresas' + '?mensaje=Se creo la empresa ' + " " +parametrosCuerpo.razonSocial)
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('error creando empresa')

        }
    }

    @Get('lista-empresas') //direccion URL que accede
    async listaEmpresas(
        @Res() responses,
        @Query() parametrosConsulta,
    ){
        try {
            //validar con un dto
            const respuesta = await this.EmpresaServices.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            console.log(respuesta);
            responses.render('proyecto/empresa/lista', {
                datos : {
                    empresas: respuesta,
                    mensaje: parametrosConsulta.mensaje
                },
            }); //paquete que esta renderizando
        }catch (error){
            throw new InternalServerErrorException(error)
        }

    }

    @Get(':idEmpresa')
    obtenerUno(@Param() parametroRuta) {
        return this.EmpresaServices.buscarUno(+parametroRuta.idEmpresa);
    }

    @Post()
    async crearUno(@Body() parametrosCuerpo){
        const empresaCrearDTO = new EmpresaCrearDTO();
        empresaCrearDTO.ruc = parametrosCuerpo.ruc;
        empresaCrearDTO.razonSocial = parametrosCuerpo.razonSocial;
        empresaCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
        empresaCrearDTO.activo = parametrosCuerpo.activo;

        try{
            const errores = await validate(empresaCrearDTO);
            if(errores.length>0){
                console.log(JSON.stringify(errores));
                throw new BadRequestException('No envia bien los parametross');
            }
            else{
                return this.EmpresaServices.crearUno(empresaCrearDTO);
            }

        }catch (error){
            console.error({error: error, mensaje: 'Errores en crear empresa'});
            throw new InternalServerErrorException('error de servidor');
        }
    }

    // metodo para editar una empresa


    @Post ('vista-actualizar/:idEmpresa')
    async vistaActualizar(@Res() response, @Param() parametrosRuta){
        try{
            const respuesta = await this.EmpresaServices.buscarUno(+parametrosRuta.idEmpresa);
            console.log(respuesta)
            response.render('proyecto/empresa/actualizar', {
                datos: {
                    empresa: respuesta
                }
            })
        } catch (error){
            console.error(error)
            throw new InternalServerErrorException('Error')
        }

    }


    @Post('/actualizar-empresa-formulario/:idEmpresa')
    async editarEmpresa(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() response,
    ) {
        const empresa = new EmpresaEditarDTO();

        empresa.ruc = parametrosCuerpo.ruc
        empresa.razonSocial = parametrosCuerpo.razonSocial;
        empresa.telefono = +parametrosCuerpo.telefono;

        try {
            const errores = await validate(empresa);
            if (errores.length > 0) {
                console.error('Error', errores);
                return response.redirect(
                    '/empresa/lista-empresas/' + '?error=Error validando datos')
            } else {
                await this.EmpresaServices.actualizarUno({
                    id: +parametrosRuta.idEmpresa,
                    data: empresa,
                });
                response.redirect(
                    '/empresa/lista-empresas' +
                    '?mensaje= Se actualizo la empresa ' +
                    parametrosCuerpo.razonSocial,
                );

            }
        }catch (e) {
            console.error({error: e, mensaje: 'Errores en editar empresa'});
            throw new InternalServerErrorException('error de servidor');
            }

        }


}