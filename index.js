const {menuInquirer, pausaInquirer} = require('./helpers/inquirer'); 

const Main = async () =>{

    let option;

    do{
        console.clear();
        option = await menuInquirer();

        if(option !== 0)
            await pausaInquirer();

    }while(option !== 0);
   
}

Main();