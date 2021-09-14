import {IsEmpty, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from 'class-validator'

export class  UsuarioCrearDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    apellido: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    nombre: String;

    @IsEmpty()
    fechaCreacion: String;
}