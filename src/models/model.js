module.exports = {


    async Db_negocios_insert(data) {
        let banco = global.banco;
        await banco.collection("negocios").insert(data, (err, result) => {
            return true
           // return { err, result }
        }).then(()=>{return 1})
        
    }
}