import AguaPotable from "../../../models/serviciosPublicos/aguaPotable";
import { getErrorMessage } from "../../error-messages";

export const existeTipoAguaPotable = async ( _id = '') => {

    try{
        const tipoAgua = await AguaPotable.findById( _id );

        if( !tipoAgua )
            throw new Error(`Tipo de Agua Potable no existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}

export const noAguaPotableRepetido = async ( nombre = '') => {

    try{
        const aguaPotable = await AguaPotable.findOne( { nombre } );

        if( aguaPotable )
            throw new Error(`Tipo de servicio de Agua Potable ya existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}