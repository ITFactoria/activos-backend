const express = require('express');
const router = express();

//Models
const Usuario = require('../models/usuario');
const Rol = require('../models/rol');

//GET by Id: Get HOST/usuarios/:id
router.get('/roles/usuario/:idUsuario', (req, res) => {
    let idUsuario = req.params.idUsuario;
    Rol.find({ usuario: idUsuario })
        .exec((err, roles) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        err: err,
                        message: `Error: Roles no encontrados para el usuario ${idUsuario}`
                    })
                }
                return res.status(500).json({
                    err: err,
                    message: `Error: Consulta no exitosa para el usuario ${idUsuario}`
                })
            }
            else {
                res.json({
                    status: "ok",
                    roles: roles
                })
            }
        })

})

module.exports = router;