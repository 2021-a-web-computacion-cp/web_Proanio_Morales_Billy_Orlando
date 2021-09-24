"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const class_validator_1 = require("class-validator");
const usuario_crearDto_1 = require("./dto/usuario-crearDto");
let UsuarioController = class UsuarioController {
    constructor(usuarioservice) {
        this.usuarioservice = usuarioservice;
    }
    inicio(response) {
        response.render('inicio.ejs');
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('usuario/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje
            }
        });
    }
    async eliminarUsuario(response, parametrosRuta) {
        try {
            await this.usuarioservice.eliminarUno(+parametrosRuta.idUsuario);
            response.redirect('/usuario/lista-usuarios' + '?mensaje= Se elimino el usuario');
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async CrearUsuarioFormulario(response, parametrosCuerpo) {
        try {
            const respuestaUsuario = await this.usuarioservice.crearUno({
                nombre: parametrosCuerpo.nombre,
                apellido: parametrosCuerpo.apellido,
            });
            response.redirect('vista-crear' + '?mensaje=Se creo el usuario' + " " + parametrosCuerpo.nombre);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('error creando usuario');
        }
    }
    async listaUsuarios(responses, parametrosConsulta) {
        try {
            const respuesta = await this.usuarioservice.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            console.log(respuesta);
            responses.render('usuario/lista', {
                datos: {
                    usuarios: respuesta,
                    mensaje: parametrosConsulta.mensaje
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    obtenerUno(parametroRuta) {
        return this.usuarioservice.buscarUno(+parametroRuta.idUsuario);
    }
    async crearUno(parametrosCuerpo) {
        const usuarioCrearDto = new usuario_crearDto_1.UsuarioCrearDto();
        usuarioCrearDto.nombre = parametrosCuerpo.nombre;
        usuarioCrearDto.apellido = parametrosCuerpo.apellido;
        usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const errores = await class_validator_1.validate(usuarioCrearDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien los parametross');
            }
            else {
                return this.usuarioservice.crearUno(usuarioCrearDto);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear usuario' });
            throw new common_1.InternalServerErrorException('error de servidor');
        }
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "inicio", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "vistaCrear", null);
__decorate([
    common_1.Post('eliminar-usuario/:idUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "eliminarUsuario", null);
__decorate([
    common_1.Post('crear-usuario-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "CrearUsuarioFormulario", null);
__decorate([
    common_1.Get('lista-usuarios'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listaUsuarios", null);
__decorate([
    common_1.Get(':idUsuario'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearUno", null);
UsuarioController = __decorate([
    common_1.Controller('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map