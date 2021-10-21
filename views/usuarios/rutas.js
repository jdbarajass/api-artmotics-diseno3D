import Express from "express";
import {
  queryAllusuarios,
  crearusuarios,
  editarusuarios,
  eliminarusuarios,
  consultarusuarios,
  queryAllusuariosVendedor,
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
  queryAllusuarios(genericcallback(res));
});

rutasusuarios.route("/usuariosVendedor").get((req, res) => {
  console.log("alguien hizo get en la ruta /usuariosVendedor");
  queryAllusuariosVendedor(genericcallback(res));
});

rutasusuarios.route("/usuarios").post((req, res) => {
  crearusuarios(req.body, genericcallback(res));
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
