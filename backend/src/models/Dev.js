const mongoose = require('mongoose');
//models é a entidade que desejamos salvar dentro do banco de dados! no nosso caso "Dev"
//schema é a estruturação de uma entidade  dentro do banco de dados!
const PointSchema = require('./utils/PointSchema');
const DevSchema =  new mongoose.Schema({

name: String,
github_username: String,
bio: String,
avatar_url: String,
techs:[String], //entende que ele armazena varias strings
location: {
    type: PointSchema,
    index: '2dsphere'
},
});

module.exports = mongoose.model('Dev', DevSchema)