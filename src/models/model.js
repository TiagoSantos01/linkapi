module.exports = {


    async  Db_negocios_insert(data) {
        let banco = global.banco;
        retorno = await banco.collection("negocios").findOne({ id: data.id })
        if (!retorno)
            return banco.collection("negocios").insertOne(data);

    },
    async Db_negocios_update(datawhere, data) {
        let banco = global.banco;
        retorno = await banco.collection("negocios").findOne(datawhere)
        if (retorno)
            return banco.collection("negocios").update(datawhere, data)

    }
    ,
    async Db_produtos_Insert_List(dados) {
        let banco = global.banco;
        if (!dados)
            return;
        retorno = await banco.collection("produtos").findOne({ deal_id: dados[0].deal_id });
        if (retorno)
            banco.collection("produtos").drop({ deal_id: dados.deal_id })
        dados.forEach(async data => {
            retorno = await banco.collection("produtos").findOne({ id: data.id, deal_id: data.deal_id });
            if (!retorno)
                banco.collection("produtos").insertOne(data)
            else
                banco.collection("produtos").update({ id: data.id, deal_id: data.deal_id }, data);
        });

    }
    ,
    async Db_produtos_Drop(dados) {
        let banco = global.banco
        retorno = await banco.collection("produtos").findOne(dados);
        if (retorno)
            banco.collection("produtos").drop(dados)
    }
}