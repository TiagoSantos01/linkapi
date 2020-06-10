module.exports = {


    async  Db_negocios_insert(data) {
        let banco = global.banco;
        retorno = await banco.collection("negocios").findOne({ _id: data._id });
        if (retorno == null)
            return banco.collection("negocios").insertOne(data);
        else
            return Db_negocios_update({ _id: data._id }, data)
    },
    async Db_negocios_update(datawhere, data) {
        let banco = global.banco;
        retorno = await banco.collection("negocios").findOne(datawhere);
        console.log(retorno,datawhere,
            data);
        if (retorno == null)
            return Db_negocios_insert(data)
        else
            teste=await banco.collection("negocios").update({ datawhere }, { data })
            console.log("foi",teste); 
            return "foi"
    }

}