const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');


module.exports = {
    async index(request, response) {
            const devs = await Dev.find();
            return response.json(devs);
    },
    async  store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});
        if (!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
         //async: pq pode demorar a responder
         //await: aguarda a api do git terminar para dar resposta.
     
         const { name = login, avatar_url, bio} = apiResponse.data;
        //  console.log(name, avatar_url, bio, github_username);
         const techsArray =  parseStringAsArray(techs);
    
         const location = {
             type: 'Point',
             coordinates: [longitude, latitude],// importante essa sequencia
         }
         dev = await Dev.create({
             github_username,
             name,
             avatar_url,
             bio,
             techs: techsArray,
             location,
         })

        // Filtrar as conexãoes que estão há no maximo 10km de distância
        // e que o novo tenha pelo menos 1 das techs filtradas
        const sendSocketMessageTo = findConnections(
            {latitude, longitude},
            techsArray,
        )

        sendMessage(sendSocketMessageTo,"new-dev", dev );
         
        }
        return response.json(dev); // sempre usar como metodo de response/resposta o ".json", nunca enviar uma string simples
    }
}