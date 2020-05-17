const mongoose = require('mongoose');
let Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');

let rolSchema = new Schema({
    codigo:{
        type : Number,
        required: [true, 'El codigo es requerido']
    },
    nombre:{
        type : String,
        required: [true, 'El nombre es requerido']
    },

    usuarios:[{
        type : Schema.Types.ObjectId,
        ref : "usuario"
    }]
});
//rolSchema.plugin(uniqueValidator,'{PATH} debe ser unico')
module.exports = mongoose.model("rol", rolSchema);
