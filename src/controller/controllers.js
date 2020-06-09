const pipe = require("pipedrive"),
    banco = global.banco;
pipe.Configuration.apiToken = "83f409a0ac6fb301aa218884a3cacb9e1940a591";

module.exports = {
    async deal_update(req, res) {
        let dados = req.body.current;
        return res.send({status:true});
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