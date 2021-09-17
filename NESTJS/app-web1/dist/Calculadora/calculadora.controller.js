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
exports.CalculadoraController = void 0;
const common_1 = require("@nestjs/common");
let CalculadoraController = class CalculadoraController {
    sumar(parametrosConsulta, request, response) {
        const cookietemp = request.cookies;
        const nombreUsuario = parametrosConsulta.nombre;
        let valorCok = cookietemp[nombreUsuario];
        if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
            return "Favor envíe su nombre de usuario para usar la calculadora o asegurese de tener un usario creado";
        }
        const resultado = parseInt(parametrosConsulta.numUno) + parseInt(parametrosConsulta.numDos);
        valorCok = valorCok - resultado;
        if (valorCok < 0) {
            this.deleteCookie(response, nombreUsuario);
            return 'Felicidades, has ganado el juego, tu nombre de usuario se eliminará';
        }
        else {
            response.cookie(nombreUsuario, valorCok);
            return 'El valor de la suma es igual a : ' + resultado + ', te quedan: ' + valorCok + ' puntos';
        }
    }
    restar(bodyParams, response, headers, request) {
        const cookietemp = request.cookies;
        const nombreUsuario = bodyParams.nombre;
        let valorCok = cookietemp[nombreUsuario];
        if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
            return "Favor envíe su nombre de usuario para usar la calculadora o asegurese de tener un usario creado";
        }
        const resultado = bodyParams.numeroUno - bodyParams.numeroDos;
        valorCok = valorCok - resultado;
        if (valorCok < 0) {
            this.deleteCookie(response, nombreUsuario);
            return 'Felicidades, has ganado el juego, tu nombre de usuario se eliminará';
        }
        else {
            response.cookie(nombreUsuario, valorCok);
            response.header('Resultado', resultado);
            return 'El valor de la resta es igual a : ' + resultado + ', te quedan: ' + valorCok + ' puntos';
        }
    }
    multiplicar(parametrosRuta, response, request) {
        const cookietemp = request.cookies;
        const nombreUsuario = parametrosRuta.nombre;
        let valorCok = cookietemp[nombreUsuario];
        if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
            return "Favor envíe su nombre de usuario para usar la calculadora o asegurese de tener un usario creado";
        }
        const resultado = (parseInt(parametrosRuta.numeroUno) * parseInt(parametrosRuta.numeroDos));
        valorCok = valorCok - resultado;
        if (valorCok < 0) {
            this.deleteCookie(response, nombreUsuario);
            return 'Felicidades, has ganado el juego, tu nombre de usuario se eliminará';
        }
        else {
            response.cookie(nombreUsuario, valorCok);
            return 'El valor de la multiplicación es igual a : ' + resultado + ', te quedan: ' + valorCok + ' puntos';
        }
    }
    dividir(request, hearderparams, response) {
        const cookietemp = request.cookies;
        const nombreUsuario = hearderparams.nombre;
        let valorCok = cookietemp[nombreUsuario];
        if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
            return "Favor envíe su nombre de usuario para usar la calculadora o asegurese de tener un usario creado";
        }
        const resultado = hearderparams.numero1 / hearderparams.numero2;
        valorCok = valorCok - resultado;
        if (valorCok < 0) {
            this.deleteCookie(response, nombreUsuario);
            return 'Felicidades, has ganado el juego, tu nombre de usuario se eliminará';
        }
        else {
            response.cookie(nombreUsuario, valorCok);
            return 'El valor de la división es igual a : ' + resultado + ', te quedan: ' + valorCok + ' puntos';
        }
    }
    setUserName(parametrosRuta, request, response) {
        console.log(response.cookie.nombre);
        response.cookie();
        response.cookie(parametrosRuta.nombre, 100);
        response.cookie('nombre', parametrosRuta.nombre);
        return 'Cookie con nombre ' + parametrosRuta.nombre + ' seteada';
    }
    borrarCookie(parametrosRuta, request, response) {
        const date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        response.clearCookie(parametrosRuta.nombre);
        return 'Cookie con nombre ' + parametrosRuta.nombre + ' eliminada';
    }
    deleteCookie(response, nombre) {
        const date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        response.clearCookie(nombre);
    }
};
__decorate([
    common_1.Get('suma'),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalculadoraController.prototype, "sumar", null);
__decorate([
    common_1.Post('resta'),
    common_1.HttpCode(201),
    common_1.Header('Resultado', 'valor'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res({ passthrough: true })),
    __param(2, common_1.Headers()),
    __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalculadoraController.prototype, "restar", null);
__decorate([
    common_1.Put('multiplicar/:numeroUno/:numeroDos/:nombre'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __param(1, common_1.Res({ passthrough: true })),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalculadoraController.prototype, "multiplicar", null);
__decorate([
    common_1.Get('dividir'),
    common_1.HttpCode(201),
    __param(0, common_1.Req()),
    __param(1, common_1.Headers()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalculadoraController.prototype, "dividir", null);
__decorate([
    common_1.Get('setName/:nombre'),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalculadoraController.prototype, "setUserName", null);
__decorate([
    common_1.Get('borrarCookie/:nombre'),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CalculadoraController.prototype, "borrarCookie", null);
__decorate([
    __param(0, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CalculadoraController.prototype, "deleteCookie", null);
CalculadoraController = __decorate([
    common_1.Controller('calculadora')
], CalculadoraController);
exports.CalculadoraController = CalculadoraController;
//# sourceMappingURL=calculadora.controller.js.map