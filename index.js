const fs = require('fs');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe
    if (fs.existsSync(path)) {
      resolve();
    //Chequear o convertir a una ruta absoluta
    //Esa ruta abs es un archivo o un directorio?
    //Si es un directorio 
    }else {
    //Si no existe la ruta se rechaza la promesa
    reject(new Error('La ruta no existe'));
    }

  });
}
//resolve y reject son callbacks -los que pasamos con then y cacth
module.exports = {
  mdLinks
};
