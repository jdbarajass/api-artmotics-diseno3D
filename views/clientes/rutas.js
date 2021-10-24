import Express from "express";
import {
  queryAllclientes,
  crearclientes,
  editarclientes,
  eliminarclientes,
  consultarclientes,
  queryAllclientesVendedor,
} from "../../controllers/clientes/controller.js";

const rutasclientes = Express.Router(); 
const genericcallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los diseños 3D");
  } else {
    res.json(result);
  }
};
rutasclientes.route("/clientes").get((req, res) => {
  console.log("alguien hizo get en la ruta /clientes");
  queryAllclientes(genericcallback(res));
});

rutasclientes.route("/clientesVendedor").get((req, res) => {
  console.log("alguien hizo get en la ruta /clientesVendedor");
  queryAllclientesVendedor(genericcallback(res));
});

rutasclientes.route("/clientes").post((req, res) => {
  crearclientes(req.body, genericcallback(res));
});

rutasclientes.route("/clientes/:id").get((req, res) => {
  console.log("alguien hizo get en la ruta /clientes");
  consultarclientes(req.params.id, genericcallback(res));
});

rutasclientes.route("/clientes/:id").patch((req, res) => {
  editarclientes(req.params.id, req.body, genericcallback(res)); 
});

rutasclientes.route("/clientes/:id").delete((req, res) => {
  eliminarclientes(req.params.id, genericcallback(res));
});

export default rutasclientes;
