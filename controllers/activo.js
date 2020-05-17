//express
const express = require('express')
const router = express()

//Models
const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const Activo = require('../models/activo')


//getAssetsByRol
router.get('/activos/roles/:idRol', (req, res) => {
    //let idUsuario = req.params.idUsuario;
    let idRol = req.params.idRol;
    console.log("datosconsulta: ", idRol);
    Activo.find({ rol: idRol })
        .exec((err, activos) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        err: err,
                        message: `Error: Activos no encontrados para el rol ${idRol}`
                    })
                }
                return res.status(500).json({
                    err: err,
                    message: `Error: Consulta no exitosa para el rol ${idRol}`
                })
            }
            else {
                res.json({
                    status: "ok",
                    activos: activos
                })
            }
        })

})


//Get Assets by Rol && Usuario
router.get('/activos/roles/usuario/:idRol/:idUsuario', (req, res) => {
    let idRol = req.params.idRol;
    let idUsuario = req.params.idUsuario;

    console.log("datosconsulta: ", idRol, idUsuario);
    Activo.find({ rol: idRol, usuario: idUsuario })
        .exec((err, activos) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        err: err,
                        message: `Error: Activos no encontrados para el rol ${idRol}`
                    })
                }
                return res.status(500).json({
                    err: err,
                    message: `Error: Consulta no exitosa para el rol ${idRol}`
                })
            }
            else {
                res.json({
                    status: "ok",
                    activos: activos
                })
            }
        })

})

//Get Assets by Usuario
router.get('/activos/usuario/:idUsuario', (req, res) => {
    let idUsuario = req.params.idUsuario;

    console.log("getAssetsByUser_datosconsulta: ", idUsuario);
    Activo.find({ usuario: idUsuario })
        .exec((err, activos) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        err: err,
                        message: `Error: Activos no encontrados para el rol ${idRol}`
                    })
                }
                return res.status(500).json({
                    err: err,
                    message: `Error: Consulta no exitosa para el rol ${idRol}`
                })
            }
            else {
                res.json({
                    status: "ok",
                    activos: activos
                })
            }
        })

})

//getActivo
getActivo: async (req, res, next) => {
    console.log("getActivo");
    const { idActivo } = req.params;
    const activo = await Activo.findById(idActivo, (err, activo) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    err: err,
                    message: `Error: Activo no encontrado para el id ${idActivo}`
                })
            }
            return res.status(500).json({
                err: err,
                message: `Error: Consulta de activo no exitosa para el activo ${idActivo}`
            })
        }
        else {
            res.json({
                status: "ok",
                activo: activo
            })
        }
    });


}

//INIT Activos
//Create: POST HOST/activos
router.post('/activos', (req, res) => {
    let body = req.body;
    console.log("post: ", body)

    let activo = new Activo({
        id: body.id,
        nombre: body.nombre,
        fichaTecnica: body.fichaTecnica,
        estado: body.estado
    });
    activo.save((err, activoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            activo: activoDB
        })
    })

})



//GET All: Get HOST/activos
router.get('/activos', (req, res) => {

    let from = Number(req.query.from || 0);
    let limit = Number(req.query.limit || 5);

    Activo.find({})
        .limit(limit)
        .skip(from)
        .exec((err, activos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                activos: activos
            })
        })
})

//GET byId: Get HOST/activos/id
router.get('/activos/:id', (req, res) => {
    res.json('Hello GET BY ID!')
})

//Create: POST HOST/activos
router.post('/activos', (req, res) => {
    let body = req.body;
    console.log("post: ", body)

    let activo = new Activo({
        id: body.id,
        nombre: body.nombre,
        fichaTecnica: body.fichaTecnica,
        estado: body.estado
    });
    activo.save((err, activoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            activo: activoDB
        })
    })

})

//Update: PUT HOST/activos/id
router.put('/activos/:id', (req, res) => {
    res.json('Hello PUT!')
})

//Delete: DELETE HOST/activos/id
router.delete('/activos/:id', (req, res) => {
    res.json('Hello DELETE')
})

module.exports = router