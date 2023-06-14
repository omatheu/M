//Importa o sqlite3 para o código
const sqlite3 = require('sqlite3').verbose();//Habilita mensagens de depuração
const { error } = require('console');
//Importa a lib path para trabalhar com caminhos de arquivos
const path = require('path');
//Cria uma constante com o caminho do banco de dados
const DBPATH = path.join(__dirname, "..", "..", "database", "database.db");

function abreBanco(query, res){
    var db = new sqlite3.Database(DBPATH);//abre o banco de dados
    db.all(query, [], (error, rows) => {//seleciona tudo 'all' do db para fazer uma consulta desde do elemento 0 da database '[]' e trata o erro 'error' e consulta linha a linha 'rows'
        if (error) {
            throw error;//caso dê erro, lance 'throw' o erro
        } else {
            res.json(rows);//se não 'else', responda/retorne 'response' ou melhor ainda 'transforme' as informações em um json (javascript objetc notation) 
        }
    });

    db.close();//fecha o banco de dados
};

//Usa o método exports para exportar a função abreBanco para ser utilizada em outras partes do projeto
module.exports = abreBanco;