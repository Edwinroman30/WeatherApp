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
            'access_token' : 'pk.eyJ1IjoiZ3VpbGxvMTgyMSIsImEiOiJja25ubjE2Mm0xMDl4MnZsdDN6NW5pb3NvIn0.iTeoxjoJq_kdptfeKrLGsw',
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
            
            const resp = await instances.get();

            console.log(resp.data);

            return resp;

        } catch (error) {
            
            return [];

        }


    }


}

module.exports = Busqueda;