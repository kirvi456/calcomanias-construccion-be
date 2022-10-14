import { model, Schema } from "mongoose";

const aguaPotableSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Se debe especificar el nombre del servicio de Agua Potable'],
        unique: [true, 'Se intenta dublicar un tipo de servicio de Agua Potable']
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

aguaPotableSchema.methods.toJSON = function() {
    const { _id, nombre, active } = this.toObject();
    return { _id, nombre, active };
}

export default model('aguaPotableTipo', aguaPotableSchema)