const { mdLinks, getLinks, validateLinks } = require('./index.js');
const process = require('process');
const chalk = require('chalk');
const optionsObject = {};

if(process.argv[3] === '--validate' || process.argv[4] === '--validate'){
    optionsObject.validate = true;
}else{
    optionsObject.validate = false;
}

mdLinks(process.argv[2], optionsObject)
.then(async (res) => {
    console.log('validateLinks: ', await validateLinks(res));
    console.log(chalk.blue(JSON.stringify(res)));
})
    .catch((error) => {
        console.log(error);
        console.log(chalk.red('LA RUTA NO EXISTE: DENEGADO'));
    });
