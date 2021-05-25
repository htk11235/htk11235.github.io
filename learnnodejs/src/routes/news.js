const express = require('express')
const route = require('.')
const   router = express.Router()

const NewController = require('../app/controllers/Newcontroller')

router.use('/:slug',NewController.show )
router.use('/',NewController.index )

module.exports = router