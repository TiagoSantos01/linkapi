module.exports = {


    async Db_negocios_insert(data) {
        let banco = global.banco;
        return banco.collection("negocios").insert(data)


    },
    async Db_negocios_update(datawhere,data) {
        let banco = global.banco;
        return banco.collection("negocios").updateOne({datawhere},{$set:data})
    }

}