const express = require('express');
const router = express();

//Models
const Usuario = require('../controllers/usuario');
const Rol = require('../controllers/rol');

//Routes
router.post('/api/activos/init', activos.init);
router.get('/api/activos/', activos.findAll);
router.get('/api/activos/:id', activos.findById);

module.exports = router;