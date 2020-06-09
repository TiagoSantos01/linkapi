const routes = require("express").Router(),
    jsonParser = require("body-parser").json(),
    controllers = require("./controller/controllers");
//  Get
routes.get('/', jsonParser, (req, res) => { return res.send("ON") })

//  POST
routes.post('/gitpull', jsonParser, controllers.git);

module.exports = routes;