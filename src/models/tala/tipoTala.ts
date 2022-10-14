import { model, Schema } from "mongoose";

const tipoTalaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Se debe especificar el nombre del tipo de tala'],
        unique: [true, 'Se intenta dublicar un tipo de tala']
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

tipoTalaSchema.methods.toJSON = function() {
    const { _id, nombre, active } = this.toObject();
    return { _id, nombre, active };
}

export default model('tipoTala', tipoTalaSchema)