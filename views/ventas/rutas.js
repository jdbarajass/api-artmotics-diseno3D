import Express from "express";
import {
  queryAllventas,
  crearventas,
  editarventas,
  eliminarventas,
  consultarventas,
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
  queryAllventas(genericcallback(res));
});

rutasventas.route("/ventas").post((req, res) => {
  crearventas(req.body, genericcallback(res));
});

rutasventas.route("/ventas/:id").get((req, res) => {
  console.log("alguien hizo get en la ruta /ventas");
  consultarventas(req.params.id, genericcallback(res));
});

rutasventas.route("/ventas/:id").patch((req, res) => {
  editarventas(req.params.id, req.body, genericcallback(res)); 
});

rutasventas.route("/ventas/:id").delete((req, res) => {
  eliminarventas(req.params.id, genericcallback(res));
});

export default rutasventas;
