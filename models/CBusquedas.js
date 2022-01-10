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


    async getWeather(long, latit) {

        try{
            
            const instances = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params:  {
                    'lat' : latit,
                    'lon' : long,
                    'appid' : process.env.OPENWEATHER_TOKEN,
                    'units' : 'metric'
                }
            });
    
            const weatherData = await instances.get();
            
            return {
                desc: weatherData.data.weather[0].description,
                temp: weatherData.data.main.temp,
                temp_min: weatherData.data.main.temp_min,
                temp_max: weatherData.data.main.temp_max
            }

        }catch (error){

            console.error(error);
            return null;
        }

    }


}

module.exports = Busqueda;