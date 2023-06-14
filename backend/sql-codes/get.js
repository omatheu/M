//Usando um módulo criado para se conectar ao banco de dados
const abreBanco = require('./connection');

function tudoTabela(){
    res.statuscode = 200;
    res.setHeader = `Access-Control-Allow-Origin`, `*`;
    let query = `SELECT * FROM pessoa`;

    abreBanco(query, res);
};

module.exports = tudoTabela;