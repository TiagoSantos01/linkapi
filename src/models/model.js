module.exports = {


    async DB_insert(table,date){
        let banco=global.banco;
        banco.collection("vendas").insert({id:1},(err,result)=>{
    console.log(result)
})
    }
}