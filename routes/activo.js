const express = require('express');
const router = express();

//Controllers
const activoController = require('../controllers/activotest');


//Routes
router.route('/api/activos').get(activoController.getActivos);
router.route('/api/activo/:idActivo').get(activoController.getActivo);
router.route('/api/activo').post(activoController.newActivo);
router.route('/api/activo/:idRol/:idUsuario').post(activoController.newActivo)
router.route('/api/activo/:idUsuario/:idRol').get(activoController.getActivosByUserByRol)




module.exports = router;