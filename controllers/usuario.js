const express = require('express');
const router = express();

//Models
const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const Activo = require('../models/activo');
const rol = require('../models/rol');




//Create: POST HOST/usuarios
router.post('/usuario', (req, res) => {
    let body = req.body;
    console.log("postbody: ", body);
    console.log("bodyrol: ", body.roles);

    let usuario = new Usuario({
        id: body.id,
        nombre: body.nombre,
        email: body.email,
        roles: [body.roles]
    })
    console.log("roles: ", usuario.roles);
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

//INIT
//Crea usuario, sus roles y sus activos : POST HOST/usuarios
router.post('/usuario/roles/activos', (req, res) => {
    let body = req.body;
    console.log("body: ", body);
    console.log("roles: ", body.codigo);
    console.log("nombre", body.nombre);

    let usuario = new Usuario({
        id: body.id,
        nombre: body.nombre,
        email: body.email,
        //roles : body.codigo
    });

    usuario.save(function (err) {
        if (err) return console.log(err)
        console.log("usuario added");

        //Create rol1
        console.log("creare rol1");
        let rol1 = new Rol({
            codigo: body.codigo,
            usuario: usuario._id

        })
        
        rol1.save(function (err) {
            if (err) return console.log(err);
            console.log("rol1 added");

            //Create activo1
            console.log("creare activo1")
            
            let activo1 = new Activo({
                id: 1,
                nombre: "taladro",
                fichaTecnica: "taladro vertical",
                ubicacion: "sabaneta",
                rol: rol1._id,
                usuario: usuario._id
            })
            activo1.save(function (err) {
                if (err) return console.log(err);
                console.log("activo1 saved");

            })
            //Create activo2
            console.log("voy a crear activo2");
            let activo2 = new Activo({
                id: 2,
                nombre: "fresadora",
                fichaTecnica: "fresadora horizontal",
                ubicacion: "envigado",
                rol: rol1._id,
                usuario: usuario._id
            })
            activo2.save(function (err) {
                if (err) return console.log(err);
                console.log("activo2 saved");
            })

        })

        //Create rol2
        console.log("voy a crear rol2")
        let rol2 = new Rol({
            codigo: 2,
            usuario: usuario._id

        })
        rol2.save(function (err) {
            if (err) return console.log(err);
            console.log("rol2 added");
            //Create activo3
            console.log("creare activo3")
            
            let activo3 = new Activo({
                id: 3,
                nombre: "torno",
                fichaTecnica: "torno vertical",
                ubicacion: "sabaneta",
                rol: rol2._id,
                usuario: usuario._id
            })
            activo3.save(function (err) {
                if (err) return console.log(err);
                console.log("activo3 saved");
            })
            //Create activo2
            console.log("creare activo4")
            
            let activo4 = new Activo({
                id: 4,
                nombre: "dobladora",
                fichaTecnica: "dobladora horizontal",
                ubicacion: "envigado",
                rol: rol2._id,
                usuario: usuario._id
            })
            activo4.save(function (err) {
                if (err) return console.log(err);
                console.log("activo4 saved");
            })
        })

        res.json({
            ok: true,
            message: "Usuario and Rol Added"
        })
    })
})

//INIT
//Crea usuario, sus roles y sus activos : POST HOST/usuarios
router.post('/usuario/roles', (req, res) => {
    let body = req.body;
    console.log("body: ", body);
    console.log("roles: ", body.codigo);

    let usuario = new Usuario({
        id: body.id,
        nombre: body.nombre,
        email: body.email,
        //roles : body.codigo
    });

    usuario.save(function (err) {
        if (err) return console.log(err)
        console.log("usuario added");

        //Create rol
        let rol = new Rol({
            codigo: body.codigo,
            usuario: usuario._id

        })
        rol.save(function (err) {
            if (err) return console.log(err);
            console.log("rol added");
        })

        //Create rol
        let rol1 = new Rol({
            codigo: body.codigo,
            usuario: usuario._id

        })
        rol1.save(function (err) {
            if (err) return console.log(err);
            console.log("rol added");
        })


        res.json({
            ok: true,
            message: "Usuario and Rol Added"
        })
    })
})



//Create user and his roles: POST HOST/usuarios
/*router.post('/usuario/:id/roles', (req, res) => {
    let id = req.params.id;

    //Create a new rol
    console.log("body=", req.body);
    let nuevoRol = new Rol(req.body);
    nuevoRol.nombre = req.body;
    console.log("nuevorol1= ", nuevoRol)
    console.log("nuevorol1name= ", nuevoRol.nombre)


    //Find the user
    console.log("usuarioid: ", id);
    let usuario = Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        else {
            
            console.log("se quedo la jija");
            console.log("usuarioname123: ", usuario.nombre);

            //Assign user to new rol
            nuevoRol.usuario = usuario;
            console.log("nuevorol: ", nuevoRol);

            //Save the rol
            //nuevoRol.save();


            //Save the rol
            console.log("saverol: ", nuevoRol);
            nuevoRol.save(function(err){
                    if (err) return console.error(err.stack)
            })
            nuevoRol.save((err, rolDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }
                else {
                    console.log("rol saved: ", rolDB);
                    /*res.json({
                        ok: true,
                        rol: rolDB
                    })

                }
            });
            console.log("se jue la jija");
            res.json({
                ok: true,
                usuario: usuario
            })
        }
    })
 
})*/




//GET All: Get HOST/usuarios
router.get('/usuarios', (req, res) => {

    let from = Number(req.query.from || 0);
    let limit = Number(req.query.limit || 5);

    Usuario.find({})
        .limit(limit)
        .skip(from)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuarios: usuarios
            })
        })
})

//GET by Id: Get HOST/usuarios/:id
router.get('/usuarios/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuario
        })

    })

})

//Get Roles by UserId
router.get('/usuarios/:id/roles', (req, res) => {
    console.log("consulta roles")
    let id = req.params.id;
    Usuario.findById(id)



    /*Usuario.find({})
    .populate("rol")
    .exec((err,usuario)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuario
        })
    })*/
})


//Get Roles
/*router.get('/usuarios/:id/roles', (req, res) => {
    console.log("consulta roles")
    let id = req.params.id;
    Usuario.find({})
    .populate("rol")
    .exec((err,usuario)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuario
        })
    })
})*/



module.exports = router;