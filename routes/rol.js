const express = require('express');
const router = express();

//Controllers
const rolController = require('../controllers/roltest');


//Routes
router.route('/api/roles').get(rolController.getRoles);
router.route('/api/roles/:idRol').get(rolController.getRol);
router.route('/api/rol').post(rolController.newRol);




module.exports = router;