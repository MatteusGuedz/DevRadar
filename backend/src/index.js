//1º vamos colocar/garantir acesso ao express colocando ele dentro de uma constante.
const express = require('express');  //lembrando que o express é uma função que irá ser usada
const mongoose = require('mongoose');
const routes = require('./routes'); //importando oq eu exportei la do routes #000exporta#
const cors = require('cors');
const { setupWebsocket } = require('./websocket'); //aula 5
const http = require('http');// aula 5
const app = express(); // criando a aplicaçaõ

const server = http.Server(app); //aula 5

setupWebsocket(server); //aula 5
mongoose.connect('mongodb+srv://MateusGuedz:32382020@guedzcluster-wj9er.mongodb.net/week10?retryWrites=true&w=majority', {  
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
});
app.use(cors());
app.use(express.json()); //com isso agora o express passa a entender os files .json! isso precisa vir antes das rotas

app.use(routes); //; dps de importado o routes  #000exporta# isso precisa vir dps do "app.use(express.json)"



server.listen(3333); //definindo a porta de acesso da aplicalção
 