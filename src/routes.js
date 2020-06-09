const routes = require("express").Router();
let bodyParser = require("body-parser").json();

routes.get('/',jsonParser, (req, res) => { res.send("ON") })