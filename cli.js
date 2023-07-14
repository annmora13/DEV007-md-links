//Cli va sacar los argumentos con process 
const { mdLinks } = require('./index.js');
mdLinks('/noexiste/').then(() => {})
.catch((error) => {
    console.log(error);
});
