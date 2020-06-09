module.exports = {
 banco = global.banco,

    async DB_insert(table,date){
        console.log(banco)
        global.banco.collection("vendas").insert({id:1},(err,result)=>{
    console.log(result)
})
    }
}