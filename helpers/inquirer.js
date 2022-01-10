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

const questioning = async (message) =>{

    const questionStructure = {
        type: 'input',
        name: 'answare',
        message,
        validate(input){

            if(input.length === 0){
                return 'Error: Debe de digital un valor...';
            }
            else{
                return true
            }
        }

    }

    return await inquirer.prompt(questionStructure);
} 



module.exports = {
    menuInquirer,
    pausaInquirer,
    questioning
};