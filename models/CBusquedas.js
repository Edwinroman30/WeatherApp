const axios = require('axios').default;

class Busqueda{

    history = [];

    constructor(){
        // TODO - Loads data from origin if exists. 
        this.history = ['Santo Domingo','Valencia','Berlin','New brunswick'];
    }


    async searchPlace(site = ''){

        //Https pettion to API to look for...

        try {
            
            const resp = await axios.get('https://reqres.in/api/users?page=2#');
            
            return resp.data;

        } catch (error) {
            
            return [];

        }


    }


}

module.exports = Busqueda;