const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usurolactSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: "usuario" },
    rol: { type: Schema.Types.ObjectId, ref: "rol" },
    activos: [{ type: Schema.Types.ObjectId, ref: "activo" }]

});
module.exports = mongoose.model('usurolact', usurolactSchema);
