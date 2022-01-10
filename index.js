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
                    
                    if(id != 0){
                        
                        //Filter the exact place (id) select in the groups of places.
                        const placeMatched = places.find( place => place.id === id );
                        
                        //Saving history
                        busqueda.saveHistory( placeMatched.placeName );

                            //Getting Temperature
                            const weather = await busqueda.getWeather(placeMatched.long, placeMatched.latt);
        
        
                            //Show the information about it:
                            console.log(`\nInformation about: ${answare}\n`);
                            console.log(`City name: ${placeMatched.placeName}`);
                            console.log(`Long: ${placeMatched.long}`);
                            console.log(`Lat: ${placeMatched.latt}`);
                            console.log(`Temperature: ${weather.temp}`);
                            console.log(`Max: ${weather.temp_max}`);
                            console.log(`Min: ${weather.temp_min}`);
                            console.log(`Weather condition: ${weather.desc}`);
                        }
                    }

                break;

            case 2:
                busqueda.history.forEach( (place, indx) => {
                    console.log(`  ${indx + 1}) ${place} `);
                });
                break;
        }

        if(option !== 0)
            await pausaInquirer();

    }while(option !== 0);
   
}

Main();