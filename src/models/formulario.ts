import { Schema, model } from 'mongoose';
import Calcomania from './calcomania';
import usuario from './usuario';

const PropietarioSchema = new Schema({
    nombres: { 
        type: String,
        required: [true, 'Se debe de proveer el nombre del propietario'],
    },
    apellidos: { 
        type: String,
        required: [true, 'Se debe de proveer el apellido del propietario'],
    },
    direccion: {
        type: String,
        required: [true, 'Se debe de proveer la direccion del propietario'],
    },
    telefonos: {
        type: [String],
        required: [true, 'Se deben indicar algun telefono del propietario'],
    },
    email: {
        type: String,
        required: [true, 'Se deben especificar el email del propietario'],
    },
    dpi: {
        type: String,
        required: [true, 'Se deben especificar el DPI del propietario'],
    },
    extendido: {
        type: String,
        required: [true, 'Se deben especificar el dondo fue extendido el DPI del propietario'],
    }
})

const InmuebleSchema = new Schema({
    direccion: {
        type: String,
        required: [true, 'Se debe especificar la direccion del inmueble']
    },
    noFinca: {
        type: String,
        required: [true, 'Se debe especificar el numero de finca']
    },
    folio: {
        type: String,
        required: [true, 'Se debe especificar el folio']
    },
    libro: {
        type: String,
        required: [true, 'Se debe especificar el libro']
    },
    area: {
        type: Number,
        required: [true, 'Se debe especificar el area del inmueble']
    },
    frente: {
        type: Number,
        required: [true, 'Se debe especificar la medida de frente']
    },
    fondo: {
        type: Number,
        required: [true, 'Se debe especificar la medida de fondo']
    },
    irregular: {
        type: Boolean,
        required: true,
        default: false
    }
})

const ObraSchema = new Schema({
    tipo: {
        type: String,
        required: [true, 'Se debe especificar el tipo de obra']
    },
    area: {
        type: String,
        required: [true, 'Se debe especificar el area de obra']
    },
    movimientoTierra: {
        type: Boolean,
        required: [true, 'Se debe especificar el movimiento de tierra de obra']
    },
    metrosCubicos: {
        type: Number,
        required: [true, 'Se deben especificar los metros cubicos']
    },
    demolicion: {
        type: Boolean,
        required: [true, 'Se debe especificar si se hará una demolición']
    },
    metrosCuadrados: {
        type: Number,
        required: [true, 'Se deben especificar los metros cuadrados']
    },
    meses: {
        type: Number,
        required: [true, 'Se deben especificar los meses esperados']
    },
    niveles: {
        type: [String],
        required: [true, 'Se deben especificar los niveles de la obra']
    },
    tipoUso: {
        type: String,
        required: [true, 'Se deben especificar el tipo de uso']
    },
    costoEstimado: {
        type: Number,
        required: [true, 'Se deben especificar el costo estimado de la obra']
    },
})

const ServiciosSchema = new Schema({
    aguaPotable: {
        type: String,
        required: [true, 'Se debe especificar el el tipo de agua potable']
    },
    drenajeSanitario: {
        type: String,
        required: [true, 'Se debe especificar el tipo de drenaje sanitario']
    },
    drenajePluvial: {
        type: String,
        required: [true, 'Se debe especificar el tipo de drenaje pluvial']
    },
    otros: {
        type: [String],
        required: [true, 'Se debe especificar si se tiene otros tipos de servicios']
    }
})

const TalaSchema = new Schema({
    necesario: {
        type: Boolean,
        required: [true, 'Se debe indicar si se necesitará talar árboles'],
        default: false
    },
    tipo: {
        type: String,
        required: [true, 'Se debe especificar el tipo']
    }
})

const PlanificadorSchema = new Schema({
    nombres: { 
        type: String,
        required: [true, 'Se debe de proveer el nombre del propietario'],
    },
    apellidos: { 
        type: String,
        required: [true, 'Se debe de proveer el apellido del propietario'],
    },
    direccion: {
        type: String,
        required: [true, 'Se debe de proveer la direccion del propietario'],
    },
    telefonos: {
        type: [String],
        required: [true, 'Se deben indicar algun telefono del propietario'],
    },
    email: {
        type: String,
        required: [true, 'Se deben especificar el email del propietario'],
    },
    dpi: {
        type: String,
        required: [true, 'Se deben especificar el DPI del propietario'],
    },
    colegiado: {
        type: Boolean,
        required: true,
        default: false
    },
    profesion: {
        type: String,
        required: [true, 'Se deben especificar la profesion del propietario'],
    },
    extendido: {
        type: String,
        required: [true, 'Se deben especificar el dondo fue extendido el DPI del propietario'],
    }
})

const EjecutorSchema = new Schema({
    nombres: { 
        type: String,
        required: [true, 'Se debe de proveer el nombre del propietario'],
    },
    apellidos: { 
        type: String,
        required: [true, 'Se debe de proveer el apellido del propietario'],
    },
    direccion: {
        type: String,
        required: [true, 'Se debe de proveer la direccion del propietario'],
    },
    telefonos: {
        type: [String],
        required: [true, 'Se deben indicar algun telefono del propietario'],
    },
    email: {
        type: String,
        required: [true, 'Se deben especificar el email del propietario'],
    },
    dpi: {
        type: String,
        required: [true, 'Se deben especificar el DPI del propietario'],
    },
    colegiado: {
        type: Boolean,
        required: true,
        default: false
    },
    profesion: {
        type: String,
        required: [true, 'Se deben especificar la profesion del propietario'],
    },
    extendido: {
        type: String,
        required: [true, 'Se deben especificar el dondo fue extendido el DPI del propietario'],
    }
})

const ReciboSchema = new Schema({
    no7b: {
        type: Number,
        required: [true, 'Se debe especificar el número de recibo'],
        unique: true,
    },
    fecha: {
        type: Number,
        required: [true, 'Se debe especificar la fecha del recibo']
    },
    total: {
        type: Number,
        required: [true, 'Se debe especificar el total del recibo']
    }
})

const FormularioSchema = new Schema({
    no: {
        type: Number,
        required: [true, 'El número de formulario es obligatorio'],
        unique: [true, 'Se esta intentando duplicar un formulario']
    },
    fechaEntrega: {
        type: Number,
        required: [true, 'Se debe de especificar la fecha de entrega del formulario.']
    },
    propietario: {
        type: PropietarioSchema
    },
    inmueble: {
        type: InmuebleSchema
    },
    obra: {
        type: ObraSchema
    },
    servicios: {
        type: ServiciosSchema
    },
    tala: {
        type: TalaSchema
    },
    planificador: {
        type: PlanificadorSchema
    },
    ejecutor: {
        type: EjecutorSchema
    },
    recibo: {
        type: ReciboSchema
    },
    calcomania: {
        type: Schema.Types.ObjectId,
        ref: Calcomania
    },
    createdAt: {
        type: Number,
        required: [true, 'Se debe especificar la fecha de creacion'],
        default: () => ( new Date() ).getTime()
    },
    userCreated: {
        type: Schema.Types.ObjectId,
        ref: usuario,
        required: [true, 'Se dene especificar quien creo el formulario']
    },
    modifiedAt: {
        type: Number,
    },
    userLastModification: {
        type: Schema.Types.ObjectId,
        ref: usuario
    },
    recibopdf: {
        type: String
    },
    formulariopdf: {
        type: String
    },
    obligacionpdf: {
        type: String
    }
});

export default model('Formulario', FormularioSchema)