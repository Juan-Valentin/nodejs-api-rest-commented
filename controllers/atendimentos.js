const Atendimento = require('../models/atendimentos')

/**
 * estabelece todas as rotas possiveis para essa api
 * GET = Busca os registros
 * POST = Cria novos registros
 * PUT = Atualiza um registro
 * DELETE = Deleta um registro
 * 
 * Cada rota chama um metodo definido la no arquivo 'atendimento.js' dento da pasta models
 * sendo conforme sua requisicao, um GET, POST, PUT ou DELETE.
 * */
module.exports = app => {  
    //rota para metodo GET em /atendimentos
    //para listar todos os atendimentos
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })
    //rota para metodo GET em /atendimentos/:id 
    //para listar um atendimento especifico pelo seu id
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.buscaPorId(id, res)
    })
    //rota para metodo POST em /atendimentos
    //para criar um novo registro
    app.post('/atendimentos', (req, res) => {
       const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
    }) 
    //rota para metodo ALTERAR (PUT) em /atendimentos/:id
    //para alterar um registro existente pelo seu id
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })
    //rota para metodo DELETE em /atendimentos/:id
    //para deletar um registro existente
    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)
    })
}