import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllventas = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("ventas").find().limit(50).toArray(callback);
};

const crearventas = async (datosventas, callback) => {
  if (
    Object.keys(datosventas).includes("name") &&
    Object.keys(datosventas).includes("brand") &&
    Object.keys(datosventas).includes("model")
  ) {
    const baseDeDatos = getDB();
    await baseDeDatos.collection("ventas").insertOne(datosventas, callback);
  } else {
    return "error";
  }
};

const consultarventas = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("ventas")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const editarventas = async (id, edicion, callback) => {
  const filtroventas = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  }; 
  const baseDeDatos = getDB();
  await baseDeDatos.collection("ventas").findOneAndUpdate(
    filtroventas,
    operacion,
    { upsert: true, returnOriginal: true },
    callback
  ); 
};
const eliminarventas = async (id, callback) => {
  const filtroventas = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("ventas").deleteOne(filtroventas, callback);
};
export {
  queryAllventas,
  crearventas,
  consultarventas,
  editarventas,
  eliminarventas,
};
