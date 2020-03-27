const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs }  = request.query;
        //busca todos os devs nu raio de 10km 
        //buscar por filtro de tecnologias
        const techsArray = parseStringAsArray(techs);
        
        const devs = await  Dev.find({
           techs: {
               $in: techsArray,
           }, 

           location:{
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance:10000
                }
           },
        });
        return response.json({devs}) //mudar
       
    }
}