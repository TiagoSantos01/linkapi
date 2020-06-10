module.exports = {


    async  Db_negocios_insert(data) {
        let banco = global.banco;
        retorno = await banco.collection("negocios").findOne({ id: data.id });
        if (retorno == null) {
            return banco.collection("negocios").insertOne(data);
        } else
            return Db_negocios_update({ id: data.id }, data)
    },
    async Db_negocios_update(datawhere, data) {
        let banco = global.banco;
        retorno = await banco.collection("negocios").findOne(datawhere);
        if (retorno == null)
            return Db_negocios_insert(data)
        else
            return banco.collection("negocios").update( datawhere , data )

    }

}