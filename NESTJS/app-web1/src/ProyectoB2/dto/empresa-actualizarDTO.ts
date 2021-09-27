import {IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class  EmpresaEditarDTO{
    telefono: number;
    ruc: string;
    activo: boolean;
    razonSocial: string;

}