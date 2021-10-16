import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });// lo necesiamos en ambas partes en db.js y en server.js y se necesitan en ambas partes porque en el server quedará el puerto y en la base de datos quedará el string de conexion a la base de datos
const stringbaseDeDatos = process.env.DATABASE_URL;// string de conexion a la base de datos
const client = new MongoClient(stringbaseDeDatos, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // son 2 configuraciones que recomienda mongo
});

let baseDeDatos;

const conectarBD = (callback) => {
  // Este codigo es el que me permite conectarme con la base de datos
  client.connect((err, db) => {
    if (err) {
      console.error("Error conectando a la base de datos");
      return "error;";
    }
    baseDeDatos = db.db("diseno3D");
    console.log("conexion a baseDeDatos éxitosa");
      return callback();
  });
}

const getDB = () => {
  return baseDeDatos;
}

export { conectarBD, getDB };
// la conexion conectarDB la exportamos para usarla en otros codigos... en el server la importamos y llamamos a la funcion conectarBD a la cual por dentro le pasamos el main y ese main lo que hace es comenzar a correr el servidor
// se movieron todos los archivos porque necesitamos que cada uno de estos se encarguen de cosas especificas entonces tenemos los achivos:
// server.js = Que se encarga solo de express
// archivos de rutas = que se encarga solo de las rutas 
// archivo de controladores = solo se encarga del controladores
// archivo de base de datos = Que solo se encarga de la conexion a la base de datos