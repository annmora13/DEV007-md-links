const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const axios = require("axios");
const { get } = require("https");

const mdLinks = (filePath, 
  options = { stats: false, validate: true}) => {
  return new Promise(async (resolve, reject) => {
    let userPath;
    if (fs.existsSync(filePath)) {
      //Pregunta si la ruta es absoluta. Si sí la deja normal
      // y si no la convierte a absoluta.
      if (path.isAbsolute(filePath)) {
        userPath = filePath;
      } else {
        userPath = path.resolve(filePath);
      }
      //Evalúa la extensión
      if (path.extname(userPath) === ".md") {
        //resolve("EL ARCHIVO ES MD: CONFIRMADO");
        const links = getLinks(userPath);
        resolve (links);
      } else {
        reject(new Error('EL ARCHIVO NO ES MD: DENEGADO'))
      }
    } else {
      resolve([]);
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
  }
  return links;
  };
  
const validateLinks = async (links) => {
  const validatedLinks = await Promise.all(
    links.map(async (link) => {
      try {
          const response = await axios.get(link.href);
          return {
            status: response.status, 
            statusText: response.statusText
            };
      } catch (error) {
        return {
        status: error.response ? error.response.status : 0,
        statusText: error.response
          ? error.response.statusText
          : "No response",
        }
      }
    })
  );
  return validatedLinks;
};

const statsLinks = (links) => new Promise((resolve) => {
  const stats = {
    total: links.length,
    unique: new Set(links.map((link) => link.href)).size,
  };
  if (links === true) {
    stats.broken = links.filter((link) => link.ok === 'fail').length;
  }
  resolve(stats);
});

module.exports = {
  mdLinks,
  getLinks,
  validateLinks,
  statsLinks
};
