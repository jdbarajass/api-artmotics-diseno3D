// Este archivo se encargará todo lo que tenga que ver con Express
import Express from "express";
// const cors = require("cors"); // Esta es otra forma de importar
import Cors from "cors"; // Esta es otra forma
import dotenv from "dotenv";
import { conectarBD } from "./db/db.js";
import rutasdiseno3D from "./views/diseno3D/rutas.js";
import rutasusuarios from "./views/usuarios/rutas.js";
import rutasclientes from "./views/clientes/rutas.js";
import rutasventas from "./views/ventas/rutas.js";

dotenv.config({ path: "./.env" }); // la ruta en donde esta mi link de conección
//dotenv.config({ path: "./.env" });
const app = Express();

app.use(Express.json()); // Cuando me llega una solicitud de tipo json en un request el      Express.json convierte el body de ese request en un objeto que ya podemos utilizar
app.use(Cors());
app.use(rutasdiseno3D)
app.use(rutasusuarios)
app.use(rutasclientes)
app.use(rutasventas)

const main = () => {
  return app.listen(process.env.PORT, () => {
    //process.env.PORT= en el archivo .env estará el puerto (PORT) en el que esta corriendo
    // el link para hacer peticiones es http://localhost:5000/diseno3D
    console.log(`Escuchando puerto 5000 ${process.env.PORT}`);
    //console.log(`Escuchando puerto 5000 ${process.env.PORT}`); // String literal para saber el puerto en el que esta corriendo
  });
};

conectarBD(main);

// ya tenemos el stringbaseDeDatos ya definimos el cliente ahora necesitamos hacer algo con el cliente para que se conecte a la base de datos, entonces antes de ejecutar app.listen necesitamos conectarnos a la base de datos

//const express = require("express") =>-- Es la forma de importar express ... En node o en proyecto de backend el import basicamente es el requiere pero hay un truco para verlo como normalmente se trabajaba que es con el import tradicional y es agregando esta pequeña libreria en el ducomento package debajo del código license:MIT y es este código "type": "module", ya con esto podemos hacer el import normal que seria import Express from "express"
//import Express from "express";
//const app = Express()// Se coloca de nombre (app) pero es como en el for el i o como el props para saber que es una propiedad, tan solo es un generico pero se le puede colocar cualquier nombre y a esta variable le vamos a comenzar a agregar rutas metodos y demás. Lo primero que debo indicarle a app es que escuche las solicitudes que van a comenzar a llegar a un puerto en especifico
//app.listen(5000, () => {
//console.log("Escuchando puerto 5000")
//})// Basicamente enciende el servidor es decir escuchar solitudes en un puerto en especifico. Entonces como react se conecta en el 3000 no debo colocar ese puerto sino otro vamos a colocar el 5000, y luego una funcion que es la que se va a ejecutar apenas ya este escuchando el servivor y para ejecutar esta parte debemos colocar node server.js que lo que hace es ejecutar el archivo server.js y el comienza a escuchar pero para correr el servidor con yarn start que es lo que se a venido trabajando entonces de nuevo en el package.json vamos a crear una seccion que se llama scripts debajo del codigo anterior "type":"module" vamos a colocar la palabra scripts y nos desplegara un codigo   "scripts": {"start": "node server.js"}, y vamos a colocar esto,"start": "node server.js" entonces cuando ejecutemos en este proyecto yarn start el proyecto revisará si en package esta el comando start y ejecuta lo que diga alfrente
// El numero 200 OK significa que todo tuvo exito y el codigo 500 que algo estuvo mal en el proceso
// si en el req no envian un body significa que no estan envian la infomacion en formato json entonces mandaria un error 500 ya que eso no fue lo que se pacto como comunicacion
// Las rutas del backEnd son las mismas de axios pero las rutas de react son diferentes
// Vamos a usar mongo db npm (https://www.npmjs.com/package/mongodb) en la parte de api-doc hacia la derecha encontramos el que dice MongoClient (https://mongodb.github.io/node-mongodb-native/4.1/classes/MongoClient.html) que es el que vamos a estar usando para instalarlo usamos yarn add mongodb
// primero lo que se debe hacer es conectarse con la base de datos para ahí si poder hacer peticiones
//  "mongodb+srv://jdbarajass:<password>@proyectodiseno3d.2h5uy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" = este es el link que se le pasa como string de baseDeDatos que tiene el siguiente formato al principio dice mongodb+srv quiere decir que es de la base de datos de mongo el jdbarajass es el usuario el password es la contraseña que tiene ese usuario la idea es que cuando haga push esto no se vaya para el git porque sino todos tendran acceso al mismo.
/*const main = () => { // el main se conectara a la base de datos y luego ejecutar el app.listen
    client.connect((err, db) => { // Al client.connect se le pasan 2 funciones err= que es si da un error y db= que es la base de datos
        if (err) {
            console.log("Error conectando a la base de datos")
        }
        const baseDeDatos = db.db("diseno3D");// adentro va el nombre de la base de datos a la que nos queremos conectar en si es a la coleccion a la que me quiero conectar
    });
    return app.listen(5000, () => {
      console.log("Escuchando puerto 5000");
    });
}
main() // luego llamo al main */

/*mongo es una libreria que me permite ejecutar
funciones dentro del codigo y como estoy
trabajando con node necesitamos la libreria
que me permita conectar node con la base
de datos en mongo que basicamente
es con el string de coneccion que este mismo
me genera */

/*  const diseno3D = [
    // vamos a suponer que esto lo esta enviando el front esto es una lista de diseños 3D
    { nombre: "Minions", color: "azul", material: "Filamento ABS" },
    { nombre: "Hulk", color: "verde", material: "Filamento Flexible" },
    { nombre: "posillo", color: "amarillo", material: "Filamento PC" },
    { nombre: "Tulip vase", color: "rojo", material: "Filamento PETG" }, // Vamos a suponer que esta informacion esta llegando a la base de datos
  ]; */
// se instala cors = yarn add cors para que puede escuchar varias solicitudes de muchos lados y no tenga inconvenientes si desde otros puertos le hacen la solicitud. Es un error de cliente usuario es decir de front pero que se debe solucionar en el backend
// En el archivo .env = Es un archivo con variables de entorno, Colocamos todo lo que no debe ir al GitHub pero que es secreto para nosotros, es decir como contraseñas, conectarnos a un api, conectarnos a una base de datos entonces colocamos la URL, el puerto donde se corre el programa y demas... Para usarlo necesito instalar la libreria yarn add dotenv = es la que nos permite organizar y usar las variables de entorno en el codigo para no tener problemas de seguridad
//import { MongoClient, ObjectId } from "mongodb"; // Importamos Mongo DB
// Vamos a crear una instancia de la clase MongoClient
// const stringbaseDeDatos = es el estring de baseDeDatos
//const stringbaseDeDatos = process.env.DATABASE_URL; // dentro de DATABASE_URL esta mi URL de conexion
//const stringbaseDeDatos =
//  "mongodb+srv://jdbarajass:artmotics2021@proyectodiseno3d.2h5uy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// Modelo = lo que va directo a la base de datos
// Vista = son las URL
// Controlador = lo que va adentro de una funcion lo que se controla