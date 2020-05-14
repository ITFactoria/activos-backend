const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos ={
    values:['FABR_ROLE','PROP_ROLE', 'TECN_ROLE', 'ADMN_ROLE'],
    message : '{VALUE} no es un rol valido'
}

let usuarioSchema = new Schema({
    id:{
        type : String,
        required: [true, 'El id es requerido']
        
    },
    nombre:{
        type : String,
        required: [true, 'El nombre es requerido']
    },
    email:{
        type : String,
        unique : true,
        required: [true, 'El email es requerido']
    },
    roles:[{
        type : Schema.Types.ObjectId,
        ref : "rol",
        required : true
    }],
    activos:[{
        type : Schema.Types.ObjectId,
        ref : "rol",
        required : true
    }]
});
usuarioSchema.plugin(uniqueValidator,'{PATH} debe ser unico')
module.exports = mongoose.model('usuario', usuarioSchema);
