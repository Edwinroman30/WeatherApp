const {menuInquirer, pausaInquirer, questioning, listingItems} = require('./helpers/inquirer'); 
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
                const places = await busqueda.searchPlace( answare );

                //Valition
                if(places.length === 0){
                    console.error('The City was not found...')
                }
                else
                {

                    const {id} = await listingItems(places);
                    
                    
                    //Filter the exact place (id) select in the groups of places.
                    const placeMatched = places.find( place => place.id === id );

                    //Temperature

                    //Show the information about it:
                    console.log(`\nInformation about: ${answare}\n`);
                    console.log(`City name: ${placeMatched.placeName}`);
                    console.log(`Long: ${placeMatched.long}`);
                    console.log(`Lat: ${placeMatched.latt}`);
                    console.log(`Temperature: {}`);
                    console.log(`Max: {}`);
                    console.log(`Min: {}`);
                    
                }

                break;

            case 2:
                break;
        }

        if(option !== 0)
            await pausaInquirer();

    }while(option !== 0);
   
}

Main();