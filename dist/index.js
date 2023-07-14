"use strict";

var fs = require('fs');
var mdLinks = function mdLinks(path, options) {
  return new Promise(function (resolve, reject) {
    // Identifica si la ruta existe
    if (fs.existsSync(path)) {
      //Chequear o convertir a una ruta absoluta
      //Esa ruta abs es un archivo o un directorio?
      //Si es un directorio 
    } else {
      //Si no existe la ruta se rechaza la promesa
      reject('La ruta no existe');
    }
  });
};
//resolve y reject son callbacks -los que pasamos con then y cacth
module.exports = {
  mdLinks: mdLinks
};