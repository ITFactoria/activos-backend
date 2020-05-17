//express
const express = require('express')
const router = express()

//Models
const Rol = require('../models/rol');

module.exports = {
    
    //POST: New Rol
    newRol: async (req, res, next) => {
        console.log("new Rol");
        const nuevoRol = new Rol({
            codigo: req.body.codigo,
            nombre: req.body.nombre
        })
        const rol = await nuevoRol.save((err, rol) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                rol: rol
            })
        });
    },

    //GET:  getRolById
    getRol: async (req, res, next) => {
        console.log("getRol");
        const { idRol } = req.params;
        const rol = await Rol.findById(idRol, (err, rol) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        err: err,
                        message: `Error: Rol no encontrado para el id ${idRol}`
                    })
                }
                return res.status(500).json({
                    err: err,
                    message: `Error: Consulta de Rol no exitosa para el Rol ${idRol}`
                })
            }
            else {
                res.json({
                    status: "ok",
                    rol: rol
                })
            }
        });

    },

    //GET: Roles
    getRoles: async (req, res, next) => {
        console.log("getRoles");
        const { idRol } = req.params;
        const rol = await Rol.find((err, roles) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        err: err,
                        message: `Error: Roles no encontrados`
                    })
                }
                return res.status(500).json({
                    err: err,
                    message: `Error: Consulta de Roles no exitosa`
                })
            }
            else {
                res.json({
                    status: "ok",
                    roles: roles
                })
            }
        });

    },

}