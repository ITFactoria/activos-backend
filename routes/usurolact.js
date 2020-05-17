const express = require('express');
const router = express();

//Controllers
const usurolactController = require('../controllers/usurolact');

//Routes
router.route('/api/usurolact/:idUsuario/:idRol').get(usurolactController.getUsuRolAct);
router.route('/api/usurolact').post(usurolactController.newUsuRolAct);



module.exports = router;