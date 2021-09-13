"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModules = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const prisma_services_1 = require("./prisma.services");
const usuario_controller_1 = require("./usuario.controller");
let UsuarioModules = class UsuarioModules {
};
UsuarioModules = __decorate([
    common_1.Module({
        imports: [],
        providers: [
            usuario_service_1.UsuarioService,
            prisma_services_1.PrismaService,
        ],
        exports: [
            usuario_service_1.UsuarioService,
        ],
        controllers: [
            usuario_controller_1.UsuarioController,
        ],
    })
], UsuarioModules);
exports.UsuarioModules = UsuarioModules;
//# sourceMappingURL=usuario.modules.js.map