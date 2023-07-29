//Cli va a ser la interacción entre la app y el usuario
//Como interfaz en terminal
// validate y stats
const { mdLinks, getLinks } = require('./index.js');
const chalk = require('chalk');

mdLinks('./Testing/testing.md').then((res) => {
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

