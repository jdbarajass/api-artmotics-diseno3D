import { getDB } from "../../db/db.js";
import {ObjectId} from "mongodb"

const queryAlldiseno3D = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("diseno3D")
    .find()
    .limit(50)
    .toArray(callback); // .find({}) a aca puedo pasar parametros de busqueda si asi lo necesito pero es necesario colocarlo asi sea vacio, el limit(50) es para limitar las infomaciones y no es tan necesario colocarlo y el toarray convierte en array convierte toda la informacion en un array en formato json para poderlo enviar a la BD
};

const creardiseno3D = async (datosdiseno3D, callback) => {
    if (
      Object.keys(datosdiseno3D).includes("name") &&
      Object.keys(datosdiseno3D).includes("brand") &&
      Object.keys(datosdiseno3D).includes("model")
    ) {
      const baseDeDatos = getDB();
      await baseDeDatos
        .collection("diseno3D")
        .insertOne(datosdiseno3D,callback);
    } else {
      return "error"; 
    }
};

const editardiseno3D = async (edicion, callback) => {
  const filtrodiseno3D = { _id: new ObjectId(edicion.id) }; // de la variable edicion sacamos el id y es muy importante colocarlo con el guion al piso _id: ... y el Objectid: es de mongo y se debe colocar para que me lo pueda reconocer
  delete edicion.id; // siempre que envio los id por el body los debo borrar porque sino el sistema los mete a la base de datos se duplican
  const operacion = {
    $set: edicion,
  }; //debo enviarle una operacion atomica (instrucciones que le debo enviar al backend) o sino me aparece este error MongoInvalidArgumentError: Update document requires atomic operators
  const baseDeDatos = getDB();
  await baseDeDatos.collection("diseno3D").findOneAndUpdate(
    // hago un filtro en el id y ahor puedo modificar el parametro que quiera
    filtrodiseno3D,
    operacion,
    { upsert: true, returnOriginal: true },callback); // baseDeDatos= conexion... dentro de collection ponemos la coleccion que queremos editar en este caso diseno3D y este codigo findOneAndUpdate()= es la funcion que me permite a mi editar, y debo pasarle 3 argumentos el filtro que quiero utilizar, cual es el dato que quiero editar o actualizar y por ultimo el callback upsert lo que hace es que si no encuentra lo que esta buscando la crearia esa nueva funcion... returnOriginal= es para comparar con el valor original y el callback es el error y el resultado
};
export { queryAlldiseno3D, creardiseno3D, editardiseno3D }
// los res.status y los res.json no se lo puedo decir al controlador porque eso es de la ruta no del controlador

 //const edicion = req.body; // tengo que recibir el vehiculo que quiero editar, os id llegan en el body y no en la URL pero tambien se puede por la URL que sea dinamica