module.exports = {


    async  Db_negocios_insert(data) {
        let banco = global.banco;
        return banco.collection("negocios").findOne({ id: data.id }, (err, result) => {
            if (!result)
                return banco.collection("negocios").insertOne(data);

        });
    },
    async Db_negocios_update(datawhere, data) {
        let banco = global.banco;
       return banco.collection("negocios").findOne(datawhere, (err, result) => {
            if (result)
                return banco.collection("negocios").update(datawhere, data)
        });
    }

}