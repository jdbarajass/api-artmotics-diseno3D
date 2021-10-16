import Express from "express";
import {
  queryAlldiseno3D,
  creardiseno3D,
  editardiseno3D,
  eliminardiseno3D,
} from "../../controllers/diseno3D/controller.js";

const rutasdiseno3D = Express.Router(); // Vamos a crear variable que va a ser la variable del router que despues vamos a importar
const genericcallback = (res) => (err, result) => {
  // esto es para enviar respuestas genericas de lo que me esta devolviendo mongo
  if (err) {
    res.status(500).send("Error consultando los diseños 3D"); // en esta linea no solo le enviamos el error sino tambien un mensaje
  } else {
    res.json(result); // enviamos el resultado de la colsulta de la base de datos lo enviamos al fronEnd pero en formado .json
  }
};
rutasdiseno3D.route("/diseno3D").get((req, res) => {
  // este codigo es para hacer una consulta a la base de datos
  console.log("alguien hizo get en la ruta /diseno3D");
  queryAlldiseno3D(genericcallback(res)); // los verbos get y post van a la misma ruta porque o los estoy obteniendo o los estoy creando
});

rutasdiseno3D.route("/diseno3D").post((req, res) => {
  creardiseno3D(req.body, genericcallback(res));
});

rutasdiseno3D.route("/diseno3D/:id").patch((req, res) => {
  // :id = ruta dinamica
  editardiseno3D(req.params.id,req.body, genericcallback(res)); // a aca entonces si yo le mando un path a un diseno en especifico, entonces ese diseno3D se editaria por medio del id de ese diseno 3D en especifico que quiero cambiar y se envia el id por medio de la URL y para saber ese id usamos params.id
});

rutasdiseno3D.route("/diseno3D/:id").delete((req, res) => {
  eliminardiseno3D(req.params.id, genericcallback(res));
});

export default rutasdiseno3D;
// el export default se usa cuando solo debo exportar una cosa y se importa directo sin las llaves pero si necesito exportar mas de una cosa lo dejo sin el default pero a la hora de importarlo lo puedo hacer pero entre lleves y puedo importar y exportar mas de una variable
// la idea es que las rutas lo unico que hagan es recibir request y enviar request

/*
rutasdiseno3D.route("/diseno3D/nuevo").post((req, res) => {
  // La pregunta de esta solicitud tipo post es como pruebo que si este funcinando ya que siempre que recargo la pagina estoy haciendo una solicitud de tipo GET eso es lo que siempre hace el navegador... Entonces para probar esto se usa insomnia que es par probar solicitudes a un api
  console.log(req);
  const datosdiseno3D = req.body; // como req.body es un objeto yo puedo obtener los keys de ese objeto... pero a aca voy a enviar los datos del vehiculo
  console.log("llaves:", Object.keys(datosdiseno3D)); // Con el body ya estoy imprimiendo lo que estoy simulando traer del fronEnd
  try {
    // Si por algun motivo sale un error se envia el estado 500 es para tener un correcto manejo de errores y saber como se solucionan
    if (
      Object.keys(datosdiseno3D).includes("name") && // con estos codigos le estoy diciendo que si envia el name el brand y el model correctos que si se puede crear pero sino no
      Object.keys(datosdiseno3D).includes("brand") &&
      Object.keys(datosdiseno3D).includes("model")
    ) {
      const baseDeDatos = getDB();
      // implementar codigo para crear diseños 3D en la BD
      baseDeDatos
        .collection("diseno3D")
        .insertOne(datosdiseno3D, (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            console.log(result);
            res.sendStatus(200);
          }
        }); // acá vamos a insertar un diseño 3D en la base de datos, pero debo saber que hacer cuando la insercion termine. a esa funcion siempre le entra un error y un resultado
      //res.sendStatus(200); // El req es el request que es la respuesta que envia el FrontEnd al BackEnd y el res es la respuesta que envia el BackEnd al FrontEnd
    } else {
      res.sendStatus(500); // Si yo le envio esto al fronEnd axios entiende que esto es un error y mostrara un mensaje en rojo tambien entiende que tuvo exito si recibe el 200 OK
    }
  } catch {
    res.sendStatus(500);
  }
});
*/
//import { getDB } from "../../db/db.js"; // import {getDB } from "../../db/db.js";= estos son imports relativos
// Lo que se hizo fue separar las rutas y los controladores

/*
rutasdiseno3D.route("/diseno3D").get((req, res) => {
  // este codigo es para hacer una consulta a la base de datos
  console.log("alguien hizo get en la ruta /diseno3D");
  queryAlldiseno3D(genericcallback(res)); //queryAlldiseno3D(responsediseno3D) lo que hace es que cuando el query termine de hacer lo que va a hacer ejecute la respuesta es decir los res.status
}); // Vamos a crear una ruta y como vamos a hacer una ruta de tipo lectura pongo app.get() y ahora en el parentesis deben ir 2 parametros el primero coloco el pat a donde quiero que esa informacion llegue es decir la ruta... el primero parametro es la ruta y el segundo parametro es una funcion que se ejecuta cuando alguien llama a esa ruta cuando alguien hace una peticion de tipo get a esa ruta es decir el callback... Cuando en react haciamos console.log lo veiamos en un f12 pero en un servidor los console.log vamos a ver esos console.log a acá mismo en la terminal de visual code es decir en la terminar en donde estamos corriendo el servidor... entonces si el console.log lo entrega el navegador es un cliente pero si el console.log lo entrega la terminar es porque es un codigo servidor
//Siempre que hago una solicitud a una ruta en express a esta funcion "/diseno3D", (req,res) =>  le deben entrar 2 parametros el req=request (quien esta haciendo la solicitud) y el res= respuesta que le voy a entregar al navegador... siempre debo estar oprimiendo control c y ejecutando de nuevo yarn start para mirar los cambios que se hagan pero para evitar esto se instala nodemon yarn add -D nodemon = y el -D es para que sea una dependencia de desarrollo entopnces el se da cuenta que se hizo algun cambio en el archivo y vuelve y lo ejecuta pero entonces en el package debemos cambiar la linea de codigo que dice "start": "node server.js" la cambiamos por "start": "nodemon server.js"
*/
