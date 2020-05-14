const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let activoSchema = new Schema({
    id:{
        type : String,
        //unique : true,
        required: [true, 'El id es requerido']
    },
    nombre:{
        type : String,
        required: [true, 'El nombre es requerido']
    },
    fichaTecnica:{
        type : String,
        required: [true, 'La ficha tecnica es requerida']
    },
    ubicacion:{
        type : String,
        required : [true, 'La ubicacion es requerida']
    },
    rol:{
        type : Schema.Types.ObjectId,
        ref : "usuario"
    },
    usuario:{
        type : Schema.Types.ObjectId,
        ref : "usuario"
    }
    
});
activoSchema.plugin(uniqueValidator,'{PATH} debe ser unico')
module.exports = mongoose.model('activo', activoSchema);
