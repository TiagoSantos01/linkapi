const routes = require("express").Router(),
    jsonParser = require("body-parser").json(),
    controllers = require("./controller/controllers");
//  Get
routes.get('/', jsonParser, (req, res) => { return res.send("ON") })

//  POST
routes.post('/deal/update',jsonParser,await controllers.deal_update);
routes.post('/deal/delete',jsonParser, controllers.deal_delete);
routes.post('/gitpull', jsonParser, controllers.git);

module.exports = routes;