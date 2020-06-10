module.exports = {


    async  Db_negocios_insert(data) {
        let banco = global.banco;


        retorno =  await banco.collection("negocios").findOne({ id: data.id });
        console.log("tempo2", new Date())

        if (retorno == null) {
            console.log("tempo3", new Date())

            return banco.collection("negocios").insertOne(data);
        } else
            return Db_negocios_update({ id: data.id }, data)
    },
    async Db_negocios_update(datawhere, data) {
        let banco = global.banco;
        retorno = await banco.collection("negocios").findOne(datawhere);
        console.log(retorno, datawhere,
            data);
        if (retorno == null)
            return Db_negocios_insert(data)
        else
            teste = await banco.collection("negocios").updateOne({ datawhere }, { data })
        console.log("foi", teste);
        return "foi"
    }

}