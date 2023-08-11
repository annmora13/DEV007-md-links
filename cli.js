const { mdLinks, getLinks, links, validateLinks, statsLinks } = require('./index.js');
const process = require('process');
const chalk = require('chalk');
const optionsObject = {};

console.log(chalk.bgMagenta.bold('Bienvenido/a a mdLinks'));
console.log(chalk.magenta.italic('Con esta herramienta podras revisar los links de tus archivos Markdown'));
    
mdLinks(process.argv[2], optionsObject)
    .then(async (res) => {
        console.log('optionsObjects: ', process.argv[3], process.argv[4]);
        const validatedLinks = await validateLinks(res);
        console.log('Links: ', res);
        const statedLinks = await statsLinks(res);
            if(process.argv[3] === '--validate' || process.argv[4] === '--validate'){
                optionsObject.validate = true;
                console.log(chalk.bgBlue('Tus datos validados:'));
                console.table(validatedLinks);
            }else{
                optionsObject.validate = false;
            }
            if(process.argv[3] === '--stats' || process.argv[4] === '--stats'){
                optionsObject.stats = true;
                console.log(chalk.bgGreen('Tus datos estadísticos:'));
                console.table(statedLinks);
            }else{
                optionsObject.stats = false;
            }
    })
        .catch((error) => {
            console.log(error);
            console.log(chalk.red('LA RUTA NO EXISTE: DENEGADO'));
        });

