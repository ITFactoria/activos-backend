//express
const express = require('express')
const router = express()

//Models
const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const Activo = require('../models/activo');
const usuario = require('../models/usuario');

module.exports = {

    //getUsuarioById
    getUsuario: async (req, res, next) => {
        console.log("getUsuario");
        const { idUsuario } = req.params;
        const usuario = await Usuario.findById(idUsuario, (err, usuario) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        err: err,
                        message: `Error: Usuario no encontrado para el id ${idUsuario}`
                    })
                }
                return res.status(500).json({
                    err: err,
                    message: `Error: Consulta de Usuario no exitosa para el Usuario ${idUsuario}`
                })
            }
            else {
                res.json({
                    status: "ok",
                    usuario: usuario
                })
            }
        });

    },

    getUsuarios: async (req, res, next) => {
        console.log("getUsuarios");
        const { idUsuario } = req.params;
        const usuario = await Usuario.find((err, usuarios) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        err: err,
                        message: `Error: Usuario no encontrados`
                    })
                }
                return res.status(500).json({
                    err: err,
                    message: `Error: Consulta de usuarios no exitosa`
                })
            }
            else {
                res.json({
                    status: "ok",
                    usuarios: usuarios
                })
            }
        });

    },

    newUsuario: async (req, res, next) => {
        console.log("this.newUsuarioRol");
        const body = req.body;
        console.log("body: ", body)

        //const idRol = req.params.idRol;
        const idRol = req.body.idRol;
        console.log("idrol: ", idRol);

        //Crea un usuario
        const nuevoUsuario = new Usuario({
            id: body.id,
            nombre: body.nombre,
            email: body.email,

        })
        console.log("usuario creado: ", nuevoUsuario);

        //Busca el rol
        const rol = await Rol.findById(idRol);
        console.log("rol encontrado: ", rol);

        //Asigna rol a usuario
        nuevoUsuario.roles.push(rol);
        //nuevoUsuario.rol = rol

        console.log("rol asignado a usuario");
        console.log("nuevousuario", nuevoUsuario);

        //Guarda el usuario
        await nuevoUsuario.save();
        console.log("usuario guardado: ", nuevoUsuario);
        console.log("rolidentificado", rol);
        

        //Incluye usuario en rol
        //rol.usuario = nuevoUsuario;
        rol.usuarios.push(nuevoUsuario);
        console.log("usuario asignado al rol");
        console.log("nuevousuario", nuevoUsuario);
        console.log("rol", rol);

        //Guarda el usuario
        await rol.save();

        
        res.status(201).json(nuevoUsuario);
    },
    
    addRol: async (req, res, next)=>{
        console.log("body: ", req.body);
        const idUsuario = req.params.idUsuario;
        const idRol = req.body.idRol;
        console.log("idUsuario: ", idUsuario);
        console.log("idRol: ", idRol);

        const usuario = await Usuario.findById(idUsuario);
        console.log("usuario encontrado: ", usuario );

        //Adiciona rol al usuario
        usuario.roles.push(idRol);

        //Guarda usuario
        await usuario.save();

        res.status(400).json(usuario);
  
    }

}