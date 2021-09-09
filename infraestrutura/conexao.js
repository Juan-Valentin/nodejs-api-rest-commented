const mysql = require('mysql')

//Variavel conexao que estabelece os parametros da conexao com o banco de dados
const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
})

module.exports = conexao