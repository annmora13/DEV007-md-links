const { mdLinks, getLinks, validateLinks, statsLinks } = require('./index.js');
const process = require('process');
const chalk = require('chalk');
const optionsObject = {};

if(process.argv[3] === '--validate' || process.argv[4] === '--validate'){
    optionsObject.validate = true;
}else{
    optionsObject.validate = false;
}

// if(process.argv[3] === '--stats' || process.argv[4] === '--stats'){
//     optionsObject.stats = false;
// }else{
//     optionsObject.stats = true;
// }

mdLinks(process.argv[2], optionsObject)
.then(async (res) => {
    console.log('optionsObjects: ', process.argv[3]);
    const validatedLinks = await validateLinks(res);
    const statedLinks = await statsLinks(res);
    console.table(validatedLinks);
    console.table(statedLinks);
    //console.table(statsLinks);
})
    .catch((error) => {
        console.log(error);
        console.log(chalk.red('LA RUTA NO EXISTE: DENEGADO'));
    });
