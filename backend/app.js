//Importa a lib Express()
const express = require('express');
const path = require('path');

/**** Pra que que serve essas paradas?? ******/
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


//Importando banco de dados com depuração por mensagens
const sqlite3 = require('sqlite3').verbose();
const { error } = require('console');

//Cria uma constante com o caminho do banco de dados
const DBPATH = path.join(__dirname, "..", "database", "database.db");

//Cria uma instância do express
const app = express();
const port = 100;

//Acessa os arquivos estáticos da aplicação
app.use(express.static('../frontend'))

//Testa o servidor
app.get('/', (_, res) => {
    res.send('CONFIA QUE VAI DAR CERTO MANO!!!')
});

//CREATE
app.post('/cria', urlencodedParser, (req, res) =>{
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const telefone = req.body.telefone;
    const idade = req.body.idade;
    const endereco = req.body.endereco;

    res.status = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    let sql = `INSERT INTO pessoa (cpf, nome, idade, telefone, endereco) VALUES (?,?,?,?,?)`
    db.run(sql, [cpf, nome, idade, telefone, endereco], (error)=>{
        if (error){
            throw error;
        } else {
            console.log('Dados salvos!');
            res.send('Formulário enviado com sucesso!');
        }
    });
    db.close();
});

//Endpoint que puxa informações do banco de dados e mostra na tela em formato json (READ)
app.get('/mostra', (_, res) =>{
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    let sql = `SELECT * FROM pessoa`;
    //Cria uma instância do sqlite
    var db = new sqlite3.Database(DBPATH);
    db.all(sql, [], (error, rows) => {
        if (error){
            throw (error);
        } else {
            res.json(rows);
        }
    });
    db.close();
});

//UPDATE


//DELETE
app.get('/remove', urlencodedParser, (req, res) =>{
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    const cpf = req.query.cpf;
    sql = `DELETE FROM pessoa WHERE cpf=?`;
    var db = new sqlite3.Database(DBPATH);
    db.all(sql, [cpf], (error) =>{
        if (error){
            throw error;
        } else {
            res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
            res.end();
        }
    });
    db.close();
})

app.listen(port, ()=>{
    console.log(`Servidor está funcionando em http://localhost:${port}`);
})


//Seria maneiro para aprender a fazer proteção a SQLInjection