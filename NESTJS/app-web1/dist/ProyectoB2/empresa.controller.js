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
exports.EmpresaController = void 0;
const common_1 = require("@nestjs/common");
const empresa_service_1 = require("./empresa.service");
const class_validator_1 = require("class-validator");
const empresa_crearDTO_1 = require("./dto/empresa-crearDTO");
const empresa_actualizarDTO_1 = require("./dto/empresa-actualizarDTO");
let EmpresaController = class EmpresaController {
    constructor(EmpresaServices) {
        this.EmpresaServices = EmpresaServices;
    }
    inicio(response) {
        response.render('proyecto/inicioProyecto.ejs');
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('proyecto/empresa/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje
            }
        });
    }
    async eliminarEmpresas(response, parametrosRuta) {
        try {
            await this.EmpresaServices.eliminarUno(+parametrosRuta.idEmpresa);
            response.redirect('/empresa/lista-empresas' + '?mensaje= Se elimino la empresa');
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async CrearEmpresaFormulario(response, parametrosCuerpo) {
        try {
            const respuestaEmpresa = await this.EmpresaServices.crearUno({
                razonSocial: parametrosCuerpo.razonSocial,
                ruc: parametrosCuerpo.ruc,
                telefono: +parametrosCuerpo.telefono,
                activo: parametrosCuerpo.activo
            });
            response.redirect('/empresa/lista-empresas' + '?mensaje=Se creo la empresa ' + " " + parametrosCuerpo.razonSocial);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('error creando empresa');
        }
    }
    async listaEmpresas(responses, parametrosConsulta) {
        try {
            const respuesta = await this.EmpresaServices.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            console.log(respuesta);
            responses.render('proyecto/empresa/lista', {
                datos: {
                    empresas: respuesta,
                    mensaje: parametrosConsulta.mensaje
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    obtenerUno(parametroRuta) {
        return this.EmpresaServices.buscarUno(+parametroRuta.idEmpresa);
    }
    async crearUno(parametrosCuerpo) {
        const empresaCrearDTO = new empresa_crearDTO_1.EmpresaCrearDTO();
        empresaCrearDTO.ruc = parametrosCuerpo.ruc;
        empresaCrearDTO.razonSocial = parametrosCuerpo.razonSocial;
        empresaCrearDTO.fechaCreacion = parametrosCuerpo.fechaCreacion;
        empresaCrearDTO.activo = parametrosCuerpo.activo;
        try {
            const errores = await class_validator_1.validate(empresaCrearDTO);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien los parametross');
            }
            else {
                return this.EmpresaServices.crearUno(empresaCrearDTO);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear empresa' });
            throw new common_1.InternalServerErrorException('error de servidor');
        }
    }
    async vistaActualizar(response, parametrosRuta) {
        try {
            const respuesta = await this.EmpresaServices.buscarUno(+parametrosRuta.idEmpresa);
            console.log(respuesta);
            response.render('proyecto/empresa/actualizar', {
                datos: {
                    empresa: respuesta
                }
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async editarEmpresa(parametrosRuta, parametrosCuerpo, response) {
        const empresa = new empresa_actualizarDTO_1.EmpresaEditarDTO();
        empresa.ruc = parametrosCuerpo.ruc;
        empresa.razonSocial = parametrosCuerpo.razonSocial;
        empresa.telefono = +parametrosCuerpo.telefono;
        try {
            const errores = await class_validator_1.validate(empresa);
            if (errores.length > 0) {
                console.error('Error', errores);
                return response.redirect('/empresa/lista-empresas/' + '?error=Error validando datos');
            }
            else {
                await this.EmpresaServices.actualizarUno({
                    id: +parametrosRuta.idEmpresa,
                    data: empresa,
                });
                response.redirect('/empresa/lista-empresas' +
                    '?mensaje= Se actualizo la empresa ' +
                    parametrosCuerpo.razonSocial);
            }
        }
        catch (e) {
            console.error({ error: e, mensaje: 'Errores en editar empresa' });
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
], EmpresaController.prototype, "inicio", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EmpresaController.prototype, "vistaCrear", null);
__decorate([
    common_1.Post('eliminar-empresa/:idEmpresa'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "eliminarEmpresas", null);
__decorate([
    common_1.Post('crear-empresa-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "CrearEmpresaFormulario", null);
__decorate([
    common_1.Get('lista-empresas'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "listaEmpresas", null);
__decorate([
    common_1.Get(':idEmpresa'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmpresaController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "crearUno", null);
__decorate([
    common_1.Post('vista-actualizar/:idEmpresa'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "vistaActualizar", null);
__decorate([
    common_1.Post('/actualizar-empresa-formulario/:idEmpresa'),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EmpresaController.prototype, "editarEmpresa", null);
EmpresaController = __decorate([
    common_1.Controller('empresa'),
    __metadata("design:paramtypes", [empresa_service_1.EmpresaService])
], EmpresaController);
exports.EmpresaController = EmpresaController;
//# sourceMappingURL=empresa.controller.js.map