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
                await banco.Db_negocios_update({ id: dados.id }, {
                    id: dados.id,
                    title: dados.title,
                    status: dados.status,
                    value: dados.value,
                    add_time: dados.add_time,
                    update_time: dados.update_time,
                    won_time: dados.won_time,
                    owner_name: dados.owner_name
                }).then(async (result) => {
                    controller = pipe.DealsController;
                    produtos = controller.listProductsAttachedToADeal({ id: dados.id })
                    produtos.then(async (result) => {
                        await banco.Db_produtos_Insert_List(result.data)
                        const request = require("request"),
                            convert = require('xml-js'),
                            apikey = '96fe77d3ed131ef9d7f76b02314ea54aaa3468223934d4a7d1a419d6207cb5f65a38cb7d';

                        let json = [];
                        let Banco = global.banco;
                        retorno = await Banco.collection("negocios").findOne({ id: dados.id })
                        Banco.collection("produtos").find({ deal_id: dados.id }).toArray(async (err, result) => {

                            itens = [];
                            await result.forEach(dado => {

                                itens.push({
                                    codigo: dado.product_id,
                                    descricao: dado.comments || " ",
                                    qtde: dado.quantity,
                                    valor: dado.sum
                                }

                                )
                            });
                            item = { item: itens }
                            json.pedidocompra = [];
                            json.pedidocompra = {
                                ordemcompra: retorno.id,
                                datacompra: `${retorno.won_time.split(" ")[0].split("-")[2]}/${retorno.won_time.split(" ")[0].split("-")[1]}/${retorno.won_time.split(" ")[0].split("-")[0]}`,
                                dataprevista: `${retorno.add_time.split(" ")[0].split("-")[2]}/${retorno.add_time.split(" ")[0].split("-")[1]}/${retorno.add_time.split(" ")[0].split("-")[0]}`,
                                fornecedor: {
                                    nome: retorno.owner_name
                                },
                                itens: item
                            }
                            xml = convert.json2xml(json, { compact: true })
                            request.post(`https://bling.com.br/Api/v2/pedidocompra/json/&apikey=${apikey}&xml=${xml}`, {}, (error, request, result) => {

                                res.send({ success: true, result: result })
                            })
                        })


                    })

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
            await banco.Db_negocios_drop({ id: id, status: "drop" }).then(result => {
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