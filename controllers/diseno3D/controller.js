import { getDB } from "../../db/db.js";

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
      baseDeDatos
        .collection("diseno3D")
        .insertOne(datosdiseno3D,callback);
    } else {
      return "error"; 
    }
};
export { queryAlldiseno3D, creardiseno3D }
// los res.status y los res.json no se lo puedo decir al controlador porque eso es de la ruta no del controlador