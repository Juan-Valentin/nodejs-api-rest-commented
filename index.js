const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')
/**
 * retorna no console a mensagem relacionada a conexão do banco se deu certo ou nao
 * 
 * caso de erro, apresenta o erro no console
 * caso nao de erro, apresenta a mensagem no console 'conectado com sucesso'
 * inicia a conexão com o banco de dados, onde la dentro cria-se a tabela caso a mesma nao exista
 * e apresenta outra mensagem no console com a mensagem de que o servidor está rodando na porta 3000 para que seja
 * realizado as requisições da API via postman (por exemplo) na porta correta
 * Exemplo: http://127.0.0.1:3000 ou http://localhost:3000
 */
conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')
        
        Tabelas.init(conexao)
        
        const app = customExpress()

        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})
