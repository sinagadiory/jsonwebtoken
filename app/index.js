const expres = require("express")
const router = require("../router")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const app = expres()

dotenv.config()
app.use(bodyParser.json())
app.use(router)

module.exports = app