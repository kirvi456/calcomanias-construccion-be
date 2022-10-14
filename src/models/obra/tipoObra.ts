import { model, Schema } from "mongoose";

const tipoObraSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Se debe especificar el nombre del tipo de obra'],
        unique: [true, 'Se intenta dublicar un tipo de obra']
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

tipoObraSchema.methods.toJSON = function() {
    const { _id, nombre, active } = this.toObject();
    return { _id, nombre, active };
}

export default model('tipoObra', tipoObraSchema)