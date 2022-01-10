const {menuInquirer} = require('./helpers/inquirer'); 

const Main = async () =>{
    
    await menuInquirer();
}

Main();