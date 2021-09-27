import { EmpresaService } from "./empresa.service";
export declare class EmpresaController {
    private EmpresaServices;
    constructor(EmpresaServices: EmpresaService);
    inicio(response: any): void;
    vistaCrear(response: any, parametrosConsulta: any): void;
    eliminarEmpresas(response: any, parametrosRuta: any): Promise<void>;
    CrearEmpresaFormulario(response: any, parametrosCuerpo: any): Promise<void>;
    listaEmpresas(responses: any, parametrosConsulta: any): Promise<void>;
    obtenerUno(parametroRuta: any): import(".prisma/client").Prisma.Prisma__EMPRESAClient<import(".prisma/client").EMPRESA>;
    crearUno(parametrosCuerpo: any): Promise<import(".prisma/client").EMPRESA>;
    vistaActualizar(response: any, parametrosRuta: any): Promise<void>;
    editarEmpresa(parametrosRuta: any, parametrosCuerpo: any, res: any): Promise<any>;
}
