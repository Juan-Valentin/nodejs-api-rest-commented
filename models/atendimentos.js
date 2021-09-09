const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {

    //POST
    //introduz um metodo de INSERT
    adiciona(atendimento, res) {
        /**
         * instancia as variaveis 'dataCriacao' e 'data' como um formato pré definido
         * tendo o padrão de ano-mês-dia hora:minutos:segundo utilizando o 'Moment.js'
         * que é pacote do javascript utilizado para validar e manipular datas
         * 
         * moment() = é utilizado para obter data e hora atual
         * moment().format() = utilizado para definir um padrão de data/hora (como no descrito acima)
         */
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        //instancia a variavel dataEhValida passando a condição de se a 'dataCriacao'
        //é a mesma ou menor que 'data'
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        //cria um array de objetos retornando de 'nome', 'valido' e 'mensagem
        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        //instancia 'erros' que recebe uma validação de uma variavel 'campo' se é a negação de maior ou igual a 'campo.valido'
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        /**
         * se a variavel 'existemErros' (que recebe o tamanho de 'erros') for igual a TRUE
         * retorna o status 500, apresentando o erro
         * 
         * Caso seja FALSE, intancia uma variavel atendimentoDatado, que é um objeto recebendo atendimento, dataCriacao
         * e data; e outra constante SQL que recebe um comando SQL de INSERÇÃO
         * */
        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
       
    }

    //GET
    //introduz um método para listar os atendimentos 
    lista(res) {
        //sql para realizer um select em toda tabela de atendimentos
        const sql = 'SELECT * FROM Atendimentos'

        //caso de errado a requisicao, retorna status 400 apresentando o erro
        //caso de certo, retorna status 200 com os resultados esperados
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    //GET
    //introduz um metodos para relizar a listagem de um atendimento pelo di
    buscaPorId(id, res) {
        //sql para realizar um select em toda a tabela atendimentos, tendo como paramentro o ID
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        //caso de errado a requisicao, retorna status 400 apresentando o erro
        //caso de certo, retorna status 200 com os resultados esperados
        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    //PUT
    //Introduz um metodo para realizar a alteraçao dos valores do atendimento diretamente pelo ID
    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }      
        //sql para realizar um update na tabela atendimentos pelo ID
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        //caso de errado a requisicao, retorna status 400 apresentando o erro
        //caso de certo, retorna status 200 com os resultados esperados
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    //DELETE
    //Introduz um metodo para realizar a delecao de um registro na tabela atendimentos
    deleta(id, res) {
        //sql para realizar a delecao de um registro na tabela atendimentos pelo ID
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        //caso de errado a requisicao, retorna status 400 apresentando o erro
        //caso de certo, retorna status 200 com os resultados esperados
        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento