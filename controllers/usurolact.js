//express
const express = require('express')
const router = express()

//Models
const UsuRolAct = require('../models/usurolact');
const Rol = require('../models/rol');
const Activo = require('../models/activo');
const Usuario = require('../models/usuario');

module.exports = {

    
    getUsuRolAct: async (req, res, next) => {
        console.log("getUsuRolActs");
        const idUsuario = req.params.idUsuario;
        const idRol = req.params.idRol;

        console.log("IdUsuario: ", idUsuario)
        console.log("IdRol: ", idRol)
        


        const usurolact = await UsuRolAct.find({ usuario: idUsuario, rol: idRol}, (err, usurolacts) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        err: err,
                        message: `Error: relacion no encontrada`
                    })
                }
                return res.status(500).json({
                    err: err,
                    message: `Error: Consulta de relaciones no encotrada`
                })
            }
            else {
                res.json({
                    status: "ok",
                    usurolacts: usurolacts
                })
            }
        });

    },

    newUsuRolAct: async (req, res, next) => {

        console.log("post usurolact");
        let idUsuario = req.body.idUsuario;
        let idRol = req.body.idRol;
        let idActivo = req.body.idActivo;

        console.log("idUsuario: ", idUsuario);
        console.log("idRol: ", idRol);
        console.log("idActivo: ", idActivo);

        //Busca Usuario
        const usuario = await Usuario.findById(idUsuario);
        console.log("usuario encontrado: ", usuario);

        //Busca Rol
        const rol = await Rol.findById(idRol);
        console.log("rol encontrado: ", rol);



        const nuevoUsuRolAct = new UsuRolAct({
            usuario: usuario._id,
            rol: rol._id
        })

        //Busca el activo
        const activo = await Activo.findById(idActivo);
        console.log("activo encontrado: ", rol);

        nuevoUsuRolAct.activos.push(activo);
        console.log("usurolact prepared: ", nuevoUsuRolAct);

        //Guarda usurolact
        await nuevoUsuRolAct.save();
        console.log("usurolact saved: ", nuevoUsuRolAct);
        
        res.status(400).json(nuevoUsuRolAct);
    }
    

}
    
    

