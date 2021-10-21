import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllclientes = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("clientes").find().limit(50).toArray(callback); 
};

const queryAllclientesVendedor = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("clientes").find({rol:"vendedor"}).limit(50).toArray(callback); 
};

const crearclientes = async (datosclientes, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection("clientes").insertOne(datosclientes, callback);
};

const consultarclientes = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("clientes")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const editarclientes = async (id, edicion, callback) => {
  const filtroclientes = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  }; 
  const baseDeDatos = getDB();
  await baseDeDatos.collection("clientes").findOneAndUpdate(
    filtroclientes,
    operacion,
    { upsert: true, returnOriginal: true },
    callback
  ); 
};
const eliminarclientes = async (id, callback) => {
  const filtroclientes = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("clientes").deleteOne(filtroclientes, callback);
};
export {
  queryAllclientes,
  crearclientes,
  consultarclientes,
  editarclientes,
  eliminarclientes,
  queryAllclientesVendedor,
};
