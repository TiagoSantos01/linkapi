const pipe = require("pipedrive"),
    banco = require('../models/model');
pipe.Configuration.apiToken = "83f409a0ac6fb301aa218884a3cacb9e1940a591";

module.exports = {
    async deal_update(req, res) {
        let dados = req.body.current;
        switch (req.body.meta.action) {
            case  "added":
                 await banco.Db_negocios_insert({
                    id: dados.id,
                    title: dados.title,
                    status: dados.status,
                    value: dados.value,
                    products_count: dados.products_count,
                    add_time:dados.add_time,
                    update_time:dados.update_time
                })
                    .then((result) => {
                        console.log(result)
                        return res.send({ success: true, result: result })
                    })
                    .catch(err => {
                        console.log(err)
                        return res.send({ success: false, error: err })
                    });

                break;
            case "updated":
                retorno = banco.Db_negocios_update({ id: dados.id }, {
                    id: dados.id,
                    title: dados.title,
                    status: dados.status,
                    value: dados.value,
                    products_count: dados.products_count,
                    update_time:dados.update_time
                })
                retorno
                    .then((result) => {
                                                console.log(result)
                        res.send({ success: true, result: result })
                    })
                    .catch(err => {
                                                console.log(err)
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