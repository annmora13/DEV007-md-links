const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const axios = require("axios");
const { get } = require("https");

//console.log(axios.isCancel('something'));

const mdLinks = (filePath, options) => {
  return new Promise(async (resolve, reject) => {
    let userPath;

    if (fs.existsSync(filePath)) {
      //Pregunta si la ruta es absoluta. Si sí la deja normal
      // y si no la convierte a absoluta.
      if (path.isAbsolute(filePath)) {
        userPath = filePath;
      } else {
        userPath = path.resolve(filePath);
        console.log(chalk.magenta(filePath));
      }
      //Evalúa la extensión
      if (path.extname(userPath) === ".md") {
        resolve("EL ARCHIVO ES MD: CONFIRMADO");
        const links = getLinks(userPath);
        console.log(links);
      } else {
        reject('EL ARCHIVO NO ES MD: DENEGADO')
      }
    } else {
      reject(new Error("LA RUTA NO EXISTE: DENEGADO"));
    }
  });
};

//leer un archivo, buscar y extraer 
//todos los enlaces en formato Markdown que contiene 
//y devolverlos en un array a través de una promesa

const getLinks = (userPath) => {
  const data = fs.readFileSync(userPath, "utf-8");
  const regex = /\[(.*?)\]\((?!#)(.*?)\)/g;
  let links = [];
  let result;
  while ((result = regex.exec(data)) !== null){
    let object ={
      href: result[2],
      text: result[1],
      file: userPath
    }
    links.push(object);
    console.log()
  }
  console.log('links: ', links);
  return links;
  };

//resolve y reject son callbacks -los que pasamos con then y cacth
module.exports = {
  mdLinks,
  getLinks,
};
