//Cli va a ser la interacción entre la app y el usuario
//Como interfaz en terminal
// validate y stats
const { mdLinks, getLinks, validateLinks } = require('./index.js');
const chalk = require('chalk');
const links =   [{
    //href: 'https://www.google.com',
    href: 'https://www.pixar.com/error404',
    text: 'Google - MDN',    
    file: 'C:\\xampp\\htdocs\\laboratoria\\md_links\\DEV007-md-links\\Testing\\testing.md'  }];

    mdLinks('./Testing/testing.md').then(async (res) => {
        console.log('validateLinks: ', await validateLinks(links));
        console.log(chalk.blue(res));
        

    })
        .catch((error) => {
            console.log(error);
            console.log(chalk.red('LA RUTA NO EXISTE: DENEGADO'));
        });

// mdLinks('./Testing/testing2.md').then((res) => {
//     console.log(chalk.blue(res));
// })
// .catch((error) => {
//     console.log(error);
//     console.log(chalk.red('EL ARCHIVO ES MD: CONFIRMADO'));
// });
// mdLinks('./Testing/testing3.md').then((res) => {
//     console.log(chalk.blue(res));
// })
// .catch((error) => {
//     console.log(error);
//     console.log(chalk.red('EL ARCHIVO ES MD: CONFIRMADO'));
// });

