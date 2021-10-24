import { ObjectId } from "mongodb";
import jwt_decode from "jwt-decode";
import { getDB } from "../../db/db.js";

const queryAllUsers = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuarios").find({}).limit(50).toArray(callback);
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
  await baseDeDatos.collection("usuarios").findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOCrearusuarios = async (req, callback) => {// dentro del req esta el token
  const token = req.headers.authorization.split("Bearer ")[1]; // saca el usuario del token
  const user = jwt_decode(token)["http://localhost/userData"];// esta es la informacion del usuario
  console.log("token", jwt_decode(token));// puedo quitar este codigo
  console.log(user);
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuarios").findOne({ email: user.email }, async (err, response) => {
      console.log("Respuesta de la consulta a la BD", response);
    if (response) {
      callback(err, response);
    } else {
      user.auth0ID = user._id;
      delete user._id; 
      user.rol = "admin"; // cuando creemos la persona quedara sin rol
      user.estado = "autorizado"; // y con estado pendiente
      await crearusuarios(user, (err, respuesta) => { console.log("respues creacion", respuesta); callback(err, user)});
      // await crearusuarios(user, (err, respuesta) => {
      //   console.log("respuesta creacion", respuesta);
      //   return callback(err, user);
      // });
      // callback(err, user)) = aca si no existe lo crea y devuelve la informacion del user
    }
    });
};

const editarusuarios = async (id, edicion, callback) => {
  const filtrousuarios = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("usuarios")
    .findOneAndUpdate(
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
  queryAllUsers,
  crearusuarios,
  consultarusuarios,
  editarusuarios,
  eliminarusuarios,
  consultarOCrearusuarios,
  queryAllusuariosVendedor
  
};
// req.headers.authorization.split('Bearer ')[1]; = Con esta funcion me permite tener la posicion 1 del split quita la palabra Bearer y me queda pulpito el token
// yarn add jwt-decode = Se instala esta libreria para desencriptar el token y sacar la informacion que me necesito de allí
  // middleware = Es un codigo que yo meto en la mitad entre la solicutud(request) y el response cada vez que uso la palabra use estoy usando un middleware
  /*

  const consultarOCrearusuarios = async (req, callback) => {
  // Siempre que inice sesion ejecuto el callback y voy a saber si un usuario esta o no creado  http://localhost:3000/userData
  // 6.1. obtener los datos del usuario desde el token
  const token = req.headers.authorization.split("Bearer ")[1]; // saca el usuario del token
   const user = jwt_decode(token)["http://localhost/userData"];// con este codigo sirve
  
  // http://localhost/userData el profe daniel tiene esta ruta
  console.log(user);
  // 6.2. con el correo del usuario o con el id del auth0, verificar si el usuario ya esta en la BD o no
  const baseDeDatos = getDB();
  await baseDeDatos.collection("usuarios").findOne({ email: user.email }, async (err, response) => {
      // no haremos el filtro por usuario sino ahora por correo electronico
      console.log("Respuesta de la consulta a la BD", response);
    if (response) {
      // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
      callback(error, response);
    } else {
      // 7.2. si el usuario no esta en la BD, lo crea y devuelve la info
      user.auth0ID = user._id;
      delete user._id; // estamos renombrando el parametro id para que ya no exista ese nombre de id como venia quedando, es decir mongo va a crear su propio id y no jalara el id que le estaba proporcionando auth0 user._id= este es el usuario que estaba antes en la BD y ya queda solo con el id de mongo y no de auth0
      user.rol = "sin rol"; // cuando creemos la persona quedara sin rol
      user.estado = "pendiente"; // y con estado pendiente
      await crearusuarios(user, (err, respuesta) => callback(err, user));
      // await crearusuarios(user, (err, respuesta) => {
      //   console.log("respuesta creacion", respuesta);
      //   return callback(err, user);
      // });
      // callback(err, user)) = aca si no existe lo crea y devuelve la informacion del user
    }
    });
};

   */
