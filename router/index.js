const express = require("express")

const router = express.Router()
const controller = require("../app/controller")
const { userroute } = require("./partials")


router.use(userroute)

router.use(controller.api.main.onLost)
router.use(controller.api.main.onError)

module.exports = router