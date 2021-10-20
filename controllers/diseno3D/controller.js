import { getDB } from "../../db/db.js";
import {ObjectId} from "mongodb"

const queryAlldiseno3D = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("diseno3D")
    .find()
    .limit(50)
    .toArray(callback); // .find({}) a aca puedo pasar parametros de busqueda si asi lo necesito pero es necesario colocarlo asi sea vacio, el limit(50) es para limitar las infomaciones y no es tan necesario colocarlo y el toarray convierte en array convierte toda la informacion en un array en formato json para poderlo enviar a la BD // hacer esta linea de codigo baseDeDatos.collection("diseno3D").find().limit(50).toArray(callback); en una base de datos relacional no se podria
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

const consultardiseno3D = async (id, callback) => {// Es para colsutar solo un producto en especifico y no todos
  const baseDeDatos = getDB();
  await baseDeDatos.collection("diseno3D").findOne({ _id: new ObjectId(id) },callback);
};

const editardiseno3D = async (id, edicion, callback) => {
  const filtrodiseno3D = { _id: new ObjectId(id) };
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
const eliminardiseno3D = async (id,callback) => {
  // para editar y eliminar en el insomnia debo enviarle id despues de la ruta http://localhost:5000/diseno3D entonces quedaria asi http://localhost:5000/diseno3D/ 6169c2cc79fb3caf4c880647 en este caso elimina pero tambien sirve para editar
  // enviamos el id por el body
  const filtrodiseno3D = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("diseno3D").deleteOne(filtrodiseno3D, callback);
}
export {
  queryAlldiseno3D,
  creardiseno3D,
  consultardiseno3D,
  editardiseno3D,
  eliminardiseno3D,
};
// los res.status y los res.json no se lo puedo decir al controlador porque eso es de la ruta no del controlador

 //const edicion = req.body; // tengo que recibir el diseño 3D que quiero editar, os id llegan en el body y no en la URL pero tambien se puede por la URL que sea dinamica
 // el async y await se usan siempre que tengo una conexion a base de datos porque debo enviar la solicitud esperar a que procese y ahi si seguir con el codigo
 // la diferencia entre put y path es que put me actuliza todo de una vez y path solo de a uno
 
  //const filtrodiseno3D = { _id: new ObjectId(edicion.id) }; // de la variable edicion sacamos el id y es muy importante colocarlo con el guion al piso _id: ... y el Objectid: es de mongo y se debe colocar para que me lo pueda reconocer
  // delete edicion.id; // Si no usamos params.id entonces siempre que envio los id por el body los debo borrar porque sino el sistema los mete a la base de datos se duplican y para eso se usa este codigo