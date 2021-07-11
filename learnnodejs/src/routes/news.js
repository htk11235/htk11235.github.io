const express = require('express')
const route = require('.')
const   router = express.Router()

const NewController = require('../app/controllers/Newcontroller')

router.get('/:slug',NewController.show )
router.get('/',NewController.index )

module.exports = router