const routes = require("express").Router();
let jsonParser = require("body-parser").json();

routes.get('/',jsonParser, (req, res) => {return res.send("ON") })
module.exports = routes;