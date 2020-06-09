module.exports = {


    async Db_negocios_insert(data) {
        let banco = global.banco;
        t =  await banco.collection("negocios").insert(data, a)
        console.log("foi", t,a);

    }
}