import Express from "express";
import {
  queryAllUsers,
  crearusuarios,
  editarusuarios,
  eliminarusuarios,
  consultarusuarios,
  consultarOCrearusuarios,
} from "../../controllers/usuarios/controller.js";

const rutasusuarios = Express.Router(); 
const genericcallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los diseños 3D");
  } else {
    res.json(result);
  }
};
rutasusuarios.route("/usuarios").get((req, res) => {
  console.log("alguien hizo get en la ruta /usuarios");
  queryAllUsers(genericcallback(res));
});

rutasusuarios.route("/usuarios").post((req, res) => {
  crearusuarios(req.body, genericcallback(res));
});

// debemos crear la ruta antes del id dinamico porque sino accederia primero a esa y no se podrian verificar los roles desde el frontend
rutasusuarios.route("/usuarios/self").get((req, res) => {
  console.log("alguien hizo get en la ruta /self");
  consultarOCrearusuarios(req, genericcallback(res));
  // consultardiseno3D(req.params.id, genericcallback(res));
});

rutasusuarios.route("/usuarios/:id").get((req, res) => {
  console.log("alguien hizo get en la ruta /usuarios");
  consultarusuarios(req.params.id, genericcallback(res));
});

rutasusuarios.route("/usuarios/:id").patch((req, res) => {
  editarusuarios(req.params.id, req.body, genericcallback(res)); 
});

rutasusuarios.route("/usuarios/:id").delete((req, res) => {
  eliminarusuarios(req.params.id, genericcallback(res));
});

export default rutasusuarios;
