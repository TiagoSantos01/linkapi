module.exports = {


    async Db_negocios_insert(data) {
        let banco = global.banco;
        t =  await banco.collection("negocios").insert(data, async (err, result) => {
            await console.log("foi11");
            return true
            // return { err, result }
        })
        console.log("foi", t);

    }
}