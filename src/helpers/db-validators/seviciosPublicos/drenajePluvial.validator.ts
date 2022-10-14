import DrenagePluvial from "../../../models/serviciosPublicos/drenajePluvial";
import { getErrorMessage } from "../../error-messages";

export const existeDrenajePluvial = async ( _id = '') => {

    try{
        const tipoPluvial = await DrenagePluvial.findById( _id );

        if( !tipoPluvial )
            throw new Error(`Tipo de Drenaje Pluvial no existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}

export const noDrenagePluvialRepetido = async ( nombre = '') => {

    try{
        const drenagePluvial = await DrenagePluvial.findOne( { nombre } );

        if( drenagePluvial )
            throw new Error(`Tipo de servicio de Drenaje Pluvial ya existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}