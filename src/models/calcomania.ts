import { Schema, model } from 'mongoose';

const RubroDescSchema = new Schema({
    no: {
        type: String,
        required: [true, 'Se debe especificar el rubro']
    },
    desc: {
        type: String,
        required: [true, 'Se debe especificar el rubro']
    },
    cantidad: {
        type: Number,
        required: [true, 'Se debe especificar la cantidad']
    },
    unidad: {
        type: Boolean,
        required: [true, 'Se debe especificar la dimensión del rubro(bool)']
    },
    unidadDesc: {
        type: String,
        required: [true, 'Se debe especificar la dimensión del rubro']
    },
})

const CalcomaniaSchema = new Schema({
    direccion: {
        type: String,
        required: [true,'Se debe especificar la dirección de la calcomania']
    },
    vencimiento: {
        type: Number,
        required: [true, 'Se debe especificar la fecha de vencimiento']
    },
    rubros: {
        type: [RubroDescSchema],
        required: [true, 'Se deben especificar los rubros']
    },
    norecibo: {
        type: Number,
        required: [true, 'Se debe especificar el recibo 7B'],
        unique: true
    },
})

export default model('Calcomania', CalcomaniaSchema)