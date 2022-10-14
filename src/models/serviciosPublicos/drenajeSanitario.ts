import { model, Schema } from "mongoose";

const drenajeSanitarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Se debe especificar el nombre del servicio de Drenaje Sanitario'],
        unique: [true, 'Se intenta dublicar un tipo de servicio de Drenaje Sanitario']
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

drenajeSanitarioSchema.methods.toJSON = function() {
    const { _id, nombre, active } = this.toObject();
    return { _id, nombre, active };
}

export default model('drenajeSanitarioTipo', drenajeSanitarioSchema)