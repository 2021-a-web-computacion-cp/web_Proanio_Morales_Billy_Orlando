import {
  BadRequestException, Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException, Param, Post, Query,
  Req,
  Res
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('texto')
  holaTexto(): string{
    return 'HOLA TEXTO ';
  }

  @Get('html')
  holaHTML(): string{
    return '<h1> hola HTML </h1>';
  }

  @Get('json')
  holaJson(): string{
    return '{mensaje: "Hola Json"}';
  }

  //ERRORES Y MANEJO DE ECEPCIONES

  @Get('bad-request')
  badRequest(){
    throw new BadRequestException();
  }

  @Get('internal-error')
  internalError(){
    throw new InternalServerErrorException();
  }

  @Get('settear-cookie-insegura')
  setearCookieInsegura(
      @Req() req,
      @Res() res,
  ){
    res.cookie(
        'galletaInsegura', // nombre
        'Tengo hambre', // valor
    );

    res.cookie(
        'Galleta Segura y firmada ', //nombre
        'web :3', // valor
        {
          secure: true,
          signed: true,
        }
    )
    res.send('OK'); //return de antes
  }

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req){
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    }
    return mensaje;
  }

  @Get( "parametros-consulta/:nombre/:apellido")
  @HttpCode(200)
  @Header('Cache-Control', ' none')
  @Header('EPN', 'SISTEMAS')
  parametrosConsulta(
      @Query() queryParams,
      @Param() params
  ){
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params
    }
  }

  @Post('parametros-cuerpo')
  @HttpCode(200)
  parametrosCuerpo(
      @Body() bodyParams,
      @Headers() cabeceraPeticion,
  ){
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabeceraPeticion
    }
  }

}
