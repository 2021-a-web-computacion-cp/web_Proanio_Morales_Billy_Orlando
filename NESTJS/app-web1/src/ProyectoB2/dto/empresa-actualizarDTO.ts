import {IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class  EmpresaEditarDTO{
    @IsNotEmpty()
    @IsString()
    @MaxLength(13)
    ruc: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    razonSocial: string;

    @IsNotEmpty()
    fechaCreacion: string;

    @IsEmpty()
    @IsNumber()
    telefono: number

    @IsNotEmpty()
    activo: boolean

}