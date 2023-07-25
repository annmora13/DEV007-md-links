const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const axios = require("axios");
const { get } = require("https");

// console.log(chalk.blue('Hello world!'));
//console.log(axios.isCancel('something'));

const mdLinks = (filePath, options) => {
  return new Promise((resolve, reject) => {
    let userPath;

    if (fs.existsSync(filePath)) {
      //Pregunta si la ruta es absoluta. Si sí la deja normal
      // y si no la convierte a absoluta.
      if (path.isAbsolute(filePath)) {
        userPath = filePath;
      } else {
        userPath = path.resolve(filePath);
      }
      console.log(userPath);
      //Evalúa la extensión
      if (path.extname(userPath) === ".md") {
        resolve("el archivo sí es md");
        getLinks(filePath);
      } else {
        reject('el archivo no es md')
      }
    } else {
      reject(new Error("La ruta no existe"));
    }
  });
};
const getLinks = (filePath) => {
  console.log("aaa", filePath);
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        const regex = /\[(.*?)\]\((?!#)(.*?)\)/g;
        const links = data.match(regex);
        resolve(links);
      }
    });
  });
};

//resolve y reject son callbacks -los que pasamos con then y cacth
module.exports = {
  mdLinks,
  getLinks,
};
