import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllusuarios = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuarios").find().limit(50).toArray(callback); 
};

const queryAllusuariosVendedor = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuarios").find({rol:"vendedor"}).limit(50).toArray(callback); 
};

const crearusuarios = async (datosusuarios, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection("usuarios").insertOne(datosusuarios, callback);
};

const consultarusuarios = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("usuarios")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const editarusuarios = async (id, edicion, callback) => {
  const filtrousuarios = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  }; 
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuarios").findOneAndUpdate(
    filtrousuarios,
    operacion,
    { upsert: true, returnOriginal: true },
    callback
  ); 
};
const eliminarusuarios = async (id, callback) => {
  const filtrousuarios = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuarios").deleteOne(filtrousuarios, callback);
};
export {
  queryAllusuarios,
  crearusuarios,
  consultarusuarios,
  editarusuarios,
  eliminarusuarios,
  queryAllusuariosVendedor,
};
