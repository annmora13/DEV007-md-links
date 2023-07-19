const fs = require('fs');
const path = require('path');

const mdLinks = (filePath, options) => {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe
    if (fs.existsSync(filePath)) {
      resolve();
    //Chequear si una ruta es absoluta
    if (path.isAbsolute(filePath)){
      resolve();
    } else {
      // Ruta relativa
      const absolutePath = path.resolve(filePath); // Convierte la ruta relativa a absoluta
      resolve(absolutePath);
    }
    //Esa ruta abs es un archivo o un directorio?
    //Si es un directorio 
    } else {
    //Si no existe la ruta se rechaza la promesa
    reject(new Error('La ruta no existe'));
    }
  });
};
//resolve y reject son callbacks -los que pasamos con then y cacth
module.exports = {
  mdLinks
};
