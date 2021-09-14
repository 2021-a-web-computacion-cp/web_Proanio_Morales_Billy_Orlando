import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);



async function bootstrap() {

    const app: any = await NestFactory.create(AppModule);
    app.set('view engine', 'ejs');

  const app = await NestFactory.create(AppModule);

  app.use(express.static('publico'));
  app.use(cookieParser("Me agradan los poliperros"));
  app.use(
      session({
        name: 'server.session.in',
        secret: 'Mo sera de tomar un traguito',
        resave: true,
        saveUnitialized: true,
        cookie: {secure: false},
        store: new fileStore(),
      }),
  );


  await app.listen(3000);
}
bootstrap();




/*
abstract class  Nombre{
    public nombrePropiedad: string;
    private appelidoPropiedad: string;
    protected edad =1;
    static comun: number = 10;
    propiedadPublica: string;
    constructor(
        propiedadPublicaParametro: string,
        public propiedadRapida:string,
    ) {
        this.propiedadPublica = propiedadPublicaParametro;
        this.propiedadRapida
    }

    public funcionPublica(parametrostring :string): void{
        //no hay return undefined
    }

    private funcionPrivada(parametroStrinf: string,
                           parametroNumbre?:number){
        //nohay retunr undefined
    }

    protected funcionPublica():number {
        return 1;
    }

    static funcionEstatica():string {
        return 'string';
    }
}
 */

/*
//variables primitivas
const  texto: string = ''; //""
const numeroEntero: number = 1;
const numeroFlotante: number = 1.2;
const soyEstudiante: boolean = true;
const noDefinido = undefined;
const noHayNada = null;
const fecha: Date = new Date();

//variables mutuables
var variableUno = 1; // no usamos esta declaracion para variables mutuables
let variableDos = 2;

// VARIABLES INMUTUABLES
const variableTres =5; //no podemos reasignar valores a una variable const

//TIPOS DE DATOS
class Usuario {
  constructor(
      public nombre: string,  //podemos acceder por el metodo publico a cualquiera de nuestros atributos
      public apellido: string
  ) {
  }
}

const usuario: Usuario = new Usuario("Billy", "Proaño");
usuario.nombre;
usuario.apellido;

interface UsuarioInterface {
  nombre: string;
  apellido: string;
  edad?: number //el simbolo de pregunta nos sirve para recibir datos undefined es decir vacios
}

let objetoUsuario : UsuarioInterface = {
  nombre: 'Billy',
  apellido: 'Proaño'
}

// PUNTEROS Y REFERENCIAS

//primitivas
let edadAvtigua = 22;
let otraEdad = edadAvtigua;
edadAvtigua += 1; //23
otraEdad -= 1; //21

//objeto
let objetoEdad = {
  edad : 22
};

let otraEdadObjeto = objetoEdad; //REFERENCIA
otraEdadObjeto.edad = otraEdadObjeto + 1;
objetoEdad.edad;
objetoEdad.edad = objetoEdad.edad + 1;
otraEdadObjeto.edad;

let otraEdadObjetoClobado = {...objetoEdad}; //Clonacion Objeto
const arregloEjemplo = [1,2,3];
let arregloClonado = [...arregloEjemplo]; //Clonacion de arreglos

//ARREGLOS

const arregloTodo = [1, '', true, null, new Date()];
const arregloNumeros: number[] = [1, 2, 3,,4, 5];

function funcionConNombre(){

}

//funciones anonimas
const indice = arregloNumeros
.findIndex(
    (numero: number) => { //funciion anonima no tienne nombre
      const elValorEsIgualATres: boolean = numero === 3;
      return elValorEsIgualATres // Condicion Boolean
    },
);

//agregar elementos al fina
arregloNumeros.push(6)
//agregar al inicio
arregloNumeros.unshift(0)


//CONDICIONES truty o falsy
//condicionales con numeros
if(0){
    console.log('truty')
}else{
    console.log('falsy')
}
if(1){
    console.log('truty')
}else{
    console.log('falsy')
}
if(-1){
    console.log('truty')
}else{
    console.log('falsy')
}
//condicionales con streings
if(""){
    console.log('truty')
}else{
    console.log('falsy') //falsy
}
if("hola "){
    console.log('truty') //truty
}else{
    console.log('falsy')
}
//condicionales ocn objetos
if({}){
    console.log('truty')
}else{
    console.log('falsy') //falsy
}
if({a:"a"}){
    console.log('truty') //truty
}else{
    console.log('falsy')
}
//condicionales con arreglos
if([]){
    console.log('truty')
}else{
    console.log('falsy') //falsy
}
if([1,2]){
    console.log('truty') //truty
}else{
    console.log('falsy')
}
if(null){
    console.log('truty')
}else{
    console.log('falsy') //falsy
}
if(undefined){
    console.log('truty')
}else{
    console.log('falsy') //falsy
}

*/