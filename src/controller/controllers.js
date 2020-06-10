const pipe = require("pipedrive"),
    banco = require('../models/model');
pipe.Configuration.apiToken = "83f409a0ac6fb301aa218884a3cacb9e1940a591";

module.exports = {
    async deal_update(req, res) {
        let dados = req.body.current;
        switch (dados.status) {
            case "open":
                console.log("tempo", new Date())
                 banco.Db_negocios_insert({
                    id: dados.id,
                    title: dados.title,
                    status: dados.status,
                    value: dados.value,
                    products_count: dados.products_count
                })
                    .then((result) => {
                        return res.send({ success: true, result: result })
                    })
                    .catch(err => {
                        return res.send({ success: false, error: err })
                    });

                break;
            case "won":
                retorno = banco.Db_negocios_update({ id: dados.id }, {
                   
                    title: dados.title,
                    status: dados.status,
                    value: dados.value,
                    products_count: dados.products_count
                })
                retorno
                    .then((result) => {
                        res.send({ success: true, result: result })
                    })
                    .catch(err => {
                        res.send({ success: false, error: err })
                    });
                break;
            default:
                break;
        }
    },
    async deal_delete(req, res) {
        let dados = req.body.current;

    },
    async git(req, res) {
        let exec = require('child_process').exec;
        const lista_de_comando = [
            'git pull origin master',
        ];
        function exc_comando(comando, fn) {
            const proximo = lista_de_comando.shift();
            if (!proximo) return fn();
            exec(proximo, {
                cwd: __dirname
            }, (err) => {
                if (err && !proximo.match(/\-s$/))
                    return res.send({ status: false, cmd: proximo });
                else
                    exc_comando(comando, fn);
            });
        }
        exc_comando(lista_de_comando, () => {
            return res.send({ status: true });

        });
    }
}