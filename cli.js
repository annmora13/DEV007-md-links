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
    const validatedLinks = await validateLinks(res);
    console.table(validatedLinks);
})
    .catch((error) => {
        console.log(error);
        console.log(chalk.red('LA RUTA NO EXISTE: DENEGADO'));
    });
