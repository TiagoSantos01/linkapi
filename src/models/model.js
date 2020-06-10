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
            return banco.collection("negocios").updateOne(datawhere, data)

    }

}