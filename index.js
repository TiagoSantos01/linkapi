const Express = require("express"),
    app = Express(),
    Mongo = require("mongodb").MongoClient,
    ConexaoURL = 'mongodb+srv://ticouser:05hQJPiXj9MzStPe@cluster0-khtzt.mongodb.net/Cluster0?retryWrites=true',
    DataBase = 'linkapi';
app.use("/", require("./src/routes"));
global.app = app;
app.listen(3001, () => {
    Mongo.connect(ConexaoURL, { useUnifiedTopology: true }, (err, result) => {
        if (err) {
            throw err;
        }
        global.banco = result.db(DataBase)
    })
});