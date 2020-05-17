//express
const express = require('express')
const router = express()

//Models
const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const Activo = require('../models/activo');
const Usurolact = require('../models/usurolact');


module.exports = {

    newActivo: async (req, res, next) => {
        let activo = req.body;
        const idRol = activo.idRol;
        const idUsuario = activo.idUsuario;

        //const idRol = req.params.idRol;
        //const idUsuario  = req.params.idUsuario;

        console.log("Activo recibido: ", activo);
        console.log("IdRol recibido: ", idRol);
        console.log("IdUsuario recibido: ", idUsuario);

        const nuevoActivo = new Activo(req.body);
        console.log("nuevoactivo: ", nuevoActivo);

        //Busca usuario
        console.log("idusuariobusqueda= ", idUsuario)
        const usuario = await Usuario.findById(idUsuario)
        //const usuario = await Usuario.find({id: '135', rol: idRol})

        console.log("usuario econtrado: ", usuario);


        //Asigna usuario a activo
        nuevoActivo.usuario = usuario;
        console.log("activo preparado : ", nuevoActivo);


        //Busca rol
        console.log("idRolbusqueda= ", idRol)
        const rol = await Rol.findById(idRol)
        console.log("rol econtrado: ", rol);


        //Asigna rol a activo
        nuevoActivo.rol = rol;
        console.log("activo preparado + rol: ", nuevoActivo);



        //Guarda activo
        await nuevoActivo.save();
        console.log("activo guaraddo : ", nuevoActivo);

        //Asigna activo a usuario
        usuario.activos.push(nuevoActivo);
        console.log("usuario listo");

        //Guarga el usuario
        await usuario.save();
        console.log("usuario guardado: ", usuario);

        //Add relarion usuario-rol-activo
        console.log("prepare relationship");
        console.log("idUsuario", idUsuario);
        console.log("idRol", idRol);
        const idActivo = nuevoActivo.idActivo;
        console.log("Activo", nuevoActivo);

        const nuevoUsuRolAct = new Usurolact({
            usuario: usuario._id,
            rol: rol._id
        })

        nuevoUsuRolAct.activos.push(nuevoActivo);
        console.log("relationship prepared: ", nuevoUsuRolAct);

        //Guarda usurolact
        await nuevoUsuRolAct.save();
        console.log("relation saved: ", nuevoUsuRolAct);

        res.status(201).json(nuevoActivo);


    },

    //getActivoById
    getActivo: async (req, res, next) => {
        console.log("getActivo");
        //const { idActivo } = req.params;
        const idActivo = req.params;

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

    },

    getActivos: async (req, res, next) => {
        console.log("getActivos");
        const { idActivo } = req.params;
        const activo = await Activo.find((err, activos) => {
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
                    activos: activos
                })
            }
        });

    },
    getActivosByUserByRol: async (req, res, next) => {
        console.log("getActivos");
        let idUsuario = req.params.idUsuario;
        let idRol = req.params.idRol;

        const activo = await Activo.find({usuario: idUsuario, rol: idRol},(err, activos) => {
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
                    activos: activos
                })
            }
        });

    }

}