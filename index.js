const {menuInquirer, pausaInquirer, questioning} = require('./helpers/inquirer'); 
const CBusquedas = require('./models/CBusquedas');

const Main = async () =>{

    let option;
    const busqueda = new CBusquedas();

    do{
        console.clear();
        option = await menuInquirer();

        switch(option){
            
            case 1:

                //Search for city/place.
                const {answare} = await questioning('Type the city you wish: ');

                //Choose the right/ place you wish.
                const resp = await busqueda.searchPlace( answare );
                //console.log(`\n  ${resp}  \n`);

                //Temperature

                //Show the information about it:
                console.log(`\nInformation about ${answare}\n`);
                console.log(`City name: {}`);
                console.log(`Long: {}`);
                console.log(`Lat: {}`);
                console.log(`Temperature: {}`);
                console.log(`Max: {}`);
                console.log(`Min: {}`);
                
                break;

            case 2:
                break;
        }

        if(option !== 0)
            await pausaInquirer();

    }while(option !== 0);
   
}

Main();