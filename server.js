import Express from "express";
// const cors = require("cors"); // Esta es otra forma de importar
import Cors from "cors"; // Esta es otra forma
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb"; // Importamos Mongo DB
// Vamos a crear una instancia de la clase MongoClient
// const stringbaseDeDatos = es el estring de baseDeDatos

dotenv.config({ path: "./.env " }); // la ruta en donde esta mi link de conección
const stringbaseDeDatos = process.env.DATABASE_URL; // dentro de DATABASE_URL esta mi URL de conexion
const client = new MongoClient(stringbaseDeDatos, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // son 2 configuraciones que recomienda mongo
});
let baseDeDatos;
const app = Express();
app.use(Express.json()); // Cuando me llega una solicitud de tipo json en un request el      Express.json convierte el body de ese request en un objeto que ya podemos utilizar
app.use(Cors());
app.get("/diseno3D", (req, res) => {
  // este codigo es para hacer una consulta a la base de datos
  console.log("alguien hizo get en la ruta /diseno3D");
  baseDeDatos
    .collection("diseno3D")
    .find({})
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send("Error consultando los diseños 3D"); // en esta linea no solo le enviamos el error sino tambien un mensaje
      } else {
        res.json(result); // enviamos el resultado de la colsulta de la base de datos
      }
    }); // .find({}) a aca puedo pasar parametros de busqueda si asi lo necesito pero es necesario colocarlo asi sea vacio, el limit(50) es para limitar las infomaciones y no es tan necesario colocarlo y el toarray convierte en array convierte toda la informacion en un array en formato json para poderlo enviar a la BD
}); // Vamos a crear una ruta y como vamos a hacer una ruta de tipo lectura pongo app.get() y ahora en el parentesis deben ir 2 parametros el primero coloco el pat a donde quiero que esa informacion llegue es decir la ruta... el primero parametro es la ruta y el segundo parametro es una funcion que se ejecuta cuando alguien llama a esa ruta cuando alguien hace una peticion de tipo get a esa ruta es decir el callback... Cuando en react haciamos console.log lo veiamos en un f12 pero en un servidor los console.log vamos a ver esos console.log a acá mismo en la terminal de visual code es decir en la terminar en donde estamos corriendo el servidor... entonces si el console.log lo entrega el navegador es un cliente pero si el console.log lo entrega la terminar es porque es un codigo servidor
//Siempre que hago una solicitud a una ruta en express a esta funcion "/diseno3D", (req,res) =>  le deben entrar 2 parametros el req=request (quien esta haciendo la solicitud) y el res= respuesta que le voy a entregar al navegador... siempre debo estar oprimiendo control c y ejecutando de nuevo yarn start para mirar los cambios que se hagan pero para evitar esto se instala nodemon yarn add -D nodemon = y el -D es para que sea una dependencia de desarrollo entopnces el se da cuenta que se hizo algun cambio en el archivo y vuelve y lo ejecuta pero entonces en el package debemos cambiar la linea de codigo que dice "start": "node server.js" la cambiamos por "start": "nodemon server.js"

app.post("/diseno3D/nuevo", (req, res) => {
  // La pregunta de esta solicitud tipo post es como pruebo que si este funcinando ya que siempre que recargo la pagina estoy haciendo una solicitud de tipo GET eso es lo que siempre hace el navegador... Entonces para probar esto se usa insomnia que es par probar solicitudes a un api
  console.log(req);
  const datosdiseno3D = req.body; // como req.body es un objeto yo puedo obtener los keys de ese objeto... pero a aca voy a enviar los datos del vehiculo
  console.log("llaves:", Object.keys(datosdiseno3D)); // Con el body ya estoy imprimiendo lo que estoy simulando traer del fronEnd
  try {
    // Si por algun motivo sale un error se envia el estado 500 es para tener un correcto manejo de errores y saber como se solucionan
    if (
      Object.keys(datosdiseno3D).includes("name") && // con estos codigos le estoy diciendo que si envia el name el brand y el model correctos que si se puede crear pero sino no
      Object.keys(datosdiseno3D).includes("brand") &&
      Object.keys(datosdiseno3D).includes("model")
    ) {
      // implementar codigo para crear diseños 3D en la BD
      baseDeDatos
        .collection("diseno3D")
        .insertOne(datosdiseno3D, (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            console.log(result);
            res.sendStatus(200);
          }
        }); // acá vamos a insertar un diseño 3D en la base de datos, pero debo saber que hacer cuando la insercion termine. a esa funcion siempre le entra un error y un resultado
      //res.sendStatus(200); // El req es el request que es la respuesta que envia el FrontEnd al BackEnd y el res es la respuesta que envia el BackEnd al FrontEnd
    } else {
      res.sendStatus(500); // Si yo le envio esto al fronEnd axios entiende que esto es un error y mostrara un mensaje en rojo tambien entiende que tuvo exito si recibe el 200 OK
    }
  } catch {
    res.sendStatus(500);
  }
});

app.patch("/diseno3D/editar", (req, res) => {
  const edicion = req.body; // tengo que recibir el vehiculo que quiero editar, os id llegan en el body y no en la URL pero tambien se puede por la URL que sea dinamica
  console.log(edicion);
  const filtrodiseno3D = { _id: new ObjectId(edicion.id) }; // de la variable edicion sacamos el id y es muy importante colocarlo con el guion al piso _id: ... y el Objectid: es de mongo y se debe colocar para que me lo pueda reconocer
  delete edicion.id; // siempre que envio los id por el body los debo borrar porque sino el sistema los mete a la base de datos se duplican
  const operacion = {
    $set: edicion,
  }; //debo enviarle una operacion atomica (instrucciones que le debo enviar al backend) o sino me aparece este error MongoInvalidArgumentError: Update document requires atomic operators
  baseDeDatos.collection("diseno3D").findOneAndUpdate(
    // hago un filtro en el id y ahor puedo modificar el parametro que quiera
    filtrodiseno3D,
    operacion,
    { upsert: true, returnOriginal: true },
    (err, result) => {
      if (err) {
        console.error("Error actulizando el diseño 3D: ", err);
        res.sendStatus(500);
      } else {
        console.log("Actualizado con éxito");
        res.sendStatus(200);
      }
    }
  ); // baseDeDatos= conexion... dentro de collection ponemos la coleccion que queremos editar en este caso diseno3D y este codigo findOneAndUpdate()= es la funcion que me permite a mi editar, y debo pasarle 3 argumentos el filtro que quiero utilizar, cual es el dato que quiero editar o actualizar y por ultimo el callback upsert lo que hace es que si no encuentra lo que esta buscando la crearia esa nueva funcion... returnOriginal= es para comparar con el valor original y el callback es el error y el resultado
});

app.delete("/diseno3D/eliminar", (req, res) => {
  // enviamos el id por el body
  const filtrodiseno3D = { _id: new ObjectId(req.body.id) };
  baseDeDatos
    .collection("diseno3D")
    .deleteOne(filtrodiseno3D, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
});

const main = () => {
  // Este codigo es el que me permite conectarme con la base de datos
  client.connect((err, db) => {
    if (err) {
      console.error("Error conectando a la base de datos");
      return "error;"
    }
    baseDeDatos = db.db("diseno3D");
    console.log("conexion a baseDeDatos éxitosa");
    return app.listen(5000, () => {
      // el link para hacer peticiones es http://localhost:5000/diseno3D
      console.log("Escuchando puerto 5000");
    });
  });
};
main();

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
