module.exports = {


    async Db_negocios_insert(data) {
        let banco = global.banco;
     return   banco.collection("negocios").insert(data )
        

    }
}