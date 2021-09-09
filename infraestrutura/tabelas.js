class Tabelas {
    //metodo inicial chamando o outro método 'criarAtendimentos'
    init(conexao) {
        this.conexao = conexao

        this.criarAtendimentos()
    }

    /**
     * metodo utilizado para criar a tabela Atendimentos, sendo criado as colunas:
     * id, cliente, pet, servico, data, dataCriacao, status e observacoes
     * 
     * */
    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        //caso de erro na conexao, retorna no console o erro, caso não, aprensenta no console que a tabela de atendimentos fora criada com sucesso
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas