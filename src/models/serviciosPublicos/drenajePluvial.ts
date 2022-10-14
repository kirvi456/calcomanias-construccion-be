import { model, Schema } from "mongoose";

const drenajePluvialSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Se debe especificar el nombre del servicio de Drenaje Pluvial'],
        unique: [true, 'Se intenta dublicar un tipo de servicio de Drenaje Pluvial']
    },
    createdAt: {
        type: Number,
        required: true,
        default: () => ( new Date() ).getTime()
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
})

drenajePluvialSchema.methods.toJSON = function() {
    const { _id, nombre, active } = this.toObject();
    return { _id, nombre, active };
}

export default model('drenajePluvialTipo', drenajePluvialSchema)