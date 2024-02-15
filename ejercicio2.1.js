const fs = require("fs");
const { MongoClient } = require("mongodb");

const urlConexion = "mongodb://127.0.0.1:27017";
const conexion = new MongoClient(urlConexion);

const bd = "dws";
const coleccion = "alumnos";

fs.readFile("alumnos.json", function (err, datos) {
  let datosJSON = JSON.parse(datos);

  insertar(datosJSON, bd, coleccion)
    .catch(console.error)
    .then(console.log)
    .finally(() => conexion.close());
});

async function insertar(datos, bd, coleccion) {
  await conexion.connect();
  const dbo = conexion.db(bd);

  let resultado = await dbo.collection(coleccion).insertMany(datos);
  console.log("Datos insertados", resultado);
}
