const express = require('express');
const router = express();

//Controllers
const usuarioController = require('../controllers/usuariotest');


//Routes
router.route('/api/usuarios').get(usuarioController.getUsuarios);
router.route('/api/usuario/:idUsuario').get(usuarioController.getUsuario)
router.route('/api/usuario').post(usuarioController.newUsuario);
router.route('/api/usuario/:idUsuario').put(usuarioController.addRol);



module.exports = router;