require('dotenv').config();
const axios = require('axios').default;

class Busqueda{

    history = [];

    constructor(){
        // TODO - Loads data from origin if exists. 
        this.history = ['Santo Domingo','Valencia','Berlin','New brunswick'];
    }

    //To use global params at time to use the same API.
    mapBoxParams(){
        return {
            'access_token' : process.env.ACCESS_TOKEN, //* TOKEN EN VARIABLES DE ENTORNO
            'limit': 5
        }
    }


    async searchPlace(site = ''){

        //Https pettion to API to look for...

        try {
            
            const instances = axios.create({
                baseURL : `https://api.mapbox.com/geocoding/v5/mapbox.places/${site}.json`,
                params: this.mapBoxParams()
            });
            
            //Getting the data from the api
            const places = await instances.get();

            //Filting the data we want to show.
            return places.data.features.map( (data) => ({

                id: data.id,
                placeName: data.place_name,
                long: data.center[0],
                latt: data.center[1]

            }));
            

        } catch (error) {
            
            return [];

        }


    }


}

module.exports = Busqueda;