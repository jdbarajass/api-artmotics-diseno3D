import Express from "express";
import {
  queryAllSales,
  crearVenta,
  editarVenta,
  eliminarVenta,
  consultarVenta,
} from "../../controllers/ventas/controller.js";

const rutasventas = Express.Router(); 
const genericcallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los diseños 3D");
  } else {
    res.json(result);
  }
};
rutasventas.route("/ventas").get((req, res) => {
  console.log("alguien hizo get en la ruta /ventas");
  queryAllSales(genericcallback(res));
});

rutasventas.route("/ventas").post((req, res) => {
  crearVenta(req.body, genericcallback(res));
});

rutasventas.route("/ventas/:id").get((req, res) => {
  console.log("alguien hizo get en la ruta /ventas");
  consultarVenta(req.params.id, genericcallback(res));
});

rutasventas.route("/ventas/:id").patch((req, res) => {
  editarVenta(req.params.id, req.body, genericcallback(res)); 
});

rutasventas.route("/ventas/:id").delete((req, res) => {
  console.log("alguien hizo delete en la ruta /ventas");
  eliminarVenta(req.params.id, genericcallback(res));
});

export default rutasventas;
