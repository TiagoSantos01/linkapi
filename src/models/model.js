module.exports = {


    async  Db_negocios_insert(data) {
        let banco = global.banco;
        retorno = await banco.collection("negocios").findOne({ id: data.id });
        console.log(retorno,data)
        if (retorno == null)
            return banco.collection("negocios").insert(data);
        else
            return Db_negocios_update({ id: data.id }, data)
    },
    async Db_negocios_update(datawhere, data) {
        let banco = global.banco;
        return banco.collection("negocios").updateOne({ datawhere }, { data })
    }

}