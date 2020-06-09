const banco = global.banco;
module.exports = {
    async DB_insert(table,date){
        console.log(global.banco)
        global.banco.collection("vendas").insert({id:1},(err,result)=>{
    console.log(result)
})
    }
}