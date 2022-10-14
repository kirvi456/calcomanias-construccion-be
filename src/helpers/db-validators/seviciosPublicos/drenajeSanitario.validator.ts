import DrenajeSanitario from "../../../models/serviciosPublicos/drenajeSanitario";
import { getErrorMessage } from "../../error-messages";

export const existeDrenajeSanitario = async ( _id = '') => {

    try{
        const tipoSanitario = await DrenajeSanitario.findById( _id );

        if( !tipoSanitario )
            throw new Error(`Tipo de Drenaje Pluvial no existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}

export const noDrenajeSanitarioRepetido = async ( nombre = '') => {

    try{
        const drenajeSanitario = await DrenajeSanitario.findOne( { nombre } );

        if( drenajeSanitario )
            throw new Error(`Tipo de servicio de Drenaje Sanitario ya existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}