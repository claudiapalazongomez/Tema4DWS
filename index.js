const { MongoClient } = require("mongodb");

const urlConexion = "mongodb://127.0.0.1:27017";
const conexion = new MongoClient(urlConexion);

actualizar()
  .catch(console.error)
  .then(console.log)
  .finally(() => console.close);

// Consultar
async function consultar() {
  await conexion.connect();
  const dbo = conexion.db("dws");

  let filtro = {};
  let resultado = await dbo.collection("alumnos").find(filtro).toArray();
  console.log("Encontrado: ", resultado);
}

// Actualizar
async function actualizar() {
  await conexion.connect();
  const dbo = conexion.db("dws");

  // Si no se especifica el filtro, se actualiza el primer registro que encuentra
  let filtro = {};
  let valores = { $set: { centro: "Sol", edad: 21 } };
  let resultado = await dbo.collection("alumnos").updateOne(filtro, valores); // .updateMany para todos los registros
  console.log(resultado);
}

// Insertar
async function insertar() {
  await conexion.connect();
  const dbo = conexion.db("dws");

  //let datos = { nombre: "Eva", edad: 20, asignatura: ["DWS", "DWC"] };
  //let resultado = await dbo.collection("alumnos").insertOne(datos);

  let datos = [
    {
      nombre: "Moisés",
      apellidos: "Nieto",
      edad: 22,
      asignatura: ["DIW", "DWC"],
    },
    {
      nombre: "Alejandro",
      asignatura: ["DWS"],
    },
  ];
  let resultado = await dbo.collection("alumnos").insertMany(datos);
  console.log("Datos insertados", resultado);
}

// Borrar
async function borrar() {
  await conexion.connect();
  const dbo = conexion.db("dws");

  // Si no se especifica el filtro, se borra el primer registro que encuentra
  let filtro = {};
  let resultado = await dbo.collection("alumnos").deleteOne(filtro); // .updateMany para todos los registros
  console.log(resultado);
}

// Join
async function consultaJoin() {
  await conexion.connect();
  const dbo = conexion.db("dws");

  let resultado = await dbo
    .collection("profesores")
    .aggregate([
      {
        $lookup: {
          from: "alumnos",
          localField: "centro",
          foreignField: "centro",
          as: "alumnos",
        },
      },
    ])
    .toArray();
  console.log(resultado);
}

// Crear colección
async function crearColeccion() {
  await conexion.connect();
  const dbo = conexion.db("dws");

  let result = await dbo.crearCollection("alumnos");
  console.log("Colección creada: " + result.collectionName);
}

// Eliminar colección
async function eliminarColeccion() {
  await conexion.connect();
  const dbo = conexion.db("dws");

  let result = await dbo.collection("profesores").drop();
  console.log(result);
}
