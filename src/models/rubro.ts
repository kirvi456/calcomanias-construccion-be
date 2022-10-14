import { Schema, model, trusted } from 'mongoose';
import usuario from './usuario';

const RubroSchema = new Schema({
    no: {
        type: String,
        required: [true, 'Se debe especificar el rubro'],
        unique: [true, 'Ya existe este rubro registrado']
    },
    desc: {
        type: String,
        required: [true, 'Se debe especificar el rubro']
    },
    unidad: {
        type: Boolean,
        required: [true, 'Se debe especificar la si contiene dimensión del rubro'],
    },
    unidadDesc: {
        type: String,
        required: [true, 'Se debe especificar la dimensión del rubro']
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Number,
        required: true,
        default: () => ( new Date() ).getTime()
    },
    userCreated: {
        type: Schema.Types.ObjectId,
        ref: usuario,
        required: [true, 'Se dene especificar quien creo el rubro']
    },
    modifiedAt: {
        type: Number,
    },
    userLastModification: {
        type: Schema.Types.ObjectId,
        ref: usuario
    },
})

RubroSchema.methods.toJSON = function() {
    const {__version, __v, createdAt, userCreated, modifiedAt, userLastModification, ...rubro} = this.toObject();
    return rubro;
}


export default model('Rubro', RubroSchema)