import TipoObra from "../../../models/obra/tipoObra";
import { getErrorMessage } from "../../error-messages";

export const existeTipoObra = async ( _id = '') => {

    try{
        const tipoObra = await TipoObra.findById( _id );

        if( !tipoObra )
            throw new Error(`Tipo de obra no existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}

export const noTipoObraRepetido = async ( nombre = '') => {

    try{
        const tipoObra = await TipoObra.findOne( { nombre } );

        if( tipoObra )
            throw new Error(`Tipo de obra ya existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}