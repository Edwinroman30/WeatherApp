const fs = require('fs');
require('dotenv').config();
const axios = require('axios').default;


class Busqueda{

    history = [];
    dbPath = './db/database.json';

    constructor(){
        //*Loads data from origin if exists. 
        this.dbLoadData();
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

    saveHistory( place = ''){

        if( this.history.includes( place.toLocaleLowerCase() ) ){
            return;
        }
        else{
            //Save local
            this.history.unshift( place.toLocaleLowerCase() );

            //Save in DB
            this.dbSaving();
        }
    }

    dbSaving(){

        //Just format the array to an object.
        const payload = {
            historial : this.history
        }

        //Override the file to save data.
        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );
    }

    dbLoadData(){

        //Check if data exists:
        if(fs.existsSync(this.dbPath)){
            const data = fs.readFileSync(this.dbPath, {encoding:'utf8'});
            this.history = JSON.parse(data).historial;
        }

    }

     get CapitalizeHistory(){

        return this.history.map(places => { 
            let words  = places.split(' ');
            words = words.map(word => word[0].toUpperCase() + word.substring(1));
            return words.join(' ');   
        }); 

    } 

}

module.exports = Busqueda;