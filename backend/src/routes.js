const {Router} = require('express');
const DevController = require('./controllers/DevController.js')
const SearchController = require('./controllers/SearchController.js')
const routes = Router();


//metodos http: GET, POST, PUT E DELETE etc..

//tipos de paramentros: 
//Query Params: req.query  (filtros, ordenação, paginação... etc)
//Route Params: req.params (identificar um recurso na alteração ou  remoção)
//Body:         req.body   (dados para criação ou alteração de um registro)

//MongoDB (Não-relacional)
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index);

module.exports = routes;// agora que exportei a rota, importo ela no arquivo principal index.js #000exporta#
