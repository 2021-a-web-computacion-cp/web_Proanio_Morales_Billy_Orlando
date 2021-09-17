export declare class CalculadoraController {
    sumar(parametrosConsulta: any, request: any, response: any): string;
    restar(bodyParams: any, response: any, headers: any, request: any): string;
    multiplicar(parametrosRuta: any, response: any, request: any): string;
    dividir(request: any, hearderparams: any, response: any): string;
    setUserName(parametrosRuta: any, request: any, response: any): string;
    borrarCookie(parametrosRuta: any, request: any, response: any): string;
    deleteCookie(response: any, nombre: any): void;
}
