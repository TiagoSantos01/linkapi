const pipe = require("pipedrive"),
    banco = require('../models/model');
pipe.Configuration.apiToken = "83f409a0ac6fb301aa218884a3cacb9e1940a591";

module.exports = {
    async deal_added(req, res) {
        let dados = req.body.current;

        await banco.Db_negocios_insert({
            id: dados.id,
            title: dados.title,
            status: dados.status,
            value: dados.value,
            add_time: dados.add_time,
            update_time: dados.update_time
        })
            .then((result) => {
                return res.send({ success: true, result: result })
            })
            .catch(err => {
                return res.send({ success: false, error: err })
            });
    },
    async deal_update(req, res) {
        let dados = req.body.current;

        switch (dados.status) {
            case "won":
                console.log(req.body);
                await banco.Db_negocios_update({ id: dados.id }, {
                    id: dados.id,
                    title: dados.title,
                    status: dados.status,
                    value: dados.value,
                    add_time: dados.add_time,
                    update_time: dados.update_time
                }).then(async (result) => {
                    controller = pipe.DealsController;
                    produtos = controller.listProductsAttachedToADeal({ id: dados.id })
                    produtos.then(async (result) => {
                        await banco.Db_produtos_Insert_List(result.data)
                    })
                    res.send({ success: true, result: result })
                })
                    .catch(err => {
                        res.send({ success: false, error: err })
                    });
                break;
            case "lost":
                await banco.Db_negocios_update({ id: dados.id }, {
                    id: dados.id,
                    title: dados.title,
                    status: dados.status,
                    value: dados.value,
                    add_time: dados.add_time,
                    update_time: dados.update_time,
                    lost_reason: dados.lost_reason,
                    lost_time: dados.lost_time
                })
                    .then(async result => {
                        await banco.Db_produtos_Drop({ deal_id: dados.id });
                        res.send({ success: true, result: result })
                    })
                    .catch(err => {
                        res.send({ success: false, error: err })
                    });
                break;
            case "open":
                await banco.Db_negocios_update({ id: dados.id }, {
                    id: dados.id,
                    title: dados.title,
                    status: dados.status,
                    value: dados.value,
                    add_time: dados.add_time,
                    update_time: dados.update_time,
                })
                    .then(async result => {
                        await banco.Db_produtos_Drop({ deal_id: dados.id });
                        res.send({ success: true, result: result })
                    })
                    .catch(err => {
                        res.send({ success: false, error: err })
                    });
                break;
        }
    },
    async deal_delete(req, res) {
        let id = req.body.meta.id;

        await banco.Db_produtos_drop({ deal_id: id }).then(async () => {
            await banco.Db_negocios_drop({ id: id,status:"drop" }).then(result => {
                res.send({ success: true, result: result })
            }).catch(err => {
                res.send({ success: false, error: err })
            });
        });

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