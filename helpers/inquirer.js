const inquirer = require('inquirer');
/* require('colors'); */

const questions = {
    type: 'list',
    name: 'options',
    message: '¿Qué desea hacer?',
    choices: [
        {
            value: 1,
            name: `${'(1)'} Busca una ciudad.`
        },
        {
            value: 2,
            name: `${'(2)'} Historial de busqueda.`
        },
        {
            value: 0,
            name: `${'(0)'} Cerrar la app.\n`
        }
    ],
    loop: false
};


const menuInquirer = async () =>{

    console.log(`============================================`);
    console.log(`                 WEATHER APP                `);
    console.log(`============================================`);

    const {options} = await inquirer.prompt(questions);

    return options;
}

const pausaInquirer = async () =>{

    const resp = await inquirer.prompt({
        type: 'input',
        name: 'Enter',
        message: `Precione ${'ENTER'} para continuar.`
    });

    return resp;
}




module.exports = {
    menuInquirer,
    pausaInquirer
};