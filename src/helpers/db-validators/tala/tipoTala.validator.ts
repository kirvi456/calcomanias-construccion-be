import TipoTala from "../../../models/tala/tipoTala";
import { getErrorMessage } from "../../error-messages";


export const existeTipoTala = async ( _id = '') => {

    try{
        const tipoTala = await TipoTala.findById( _id );

        if( !tipoTala )
            throw new Error(`Tipo de Tala no existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}

export const noTipoTalaRepetido = async ( nombre = '') => {

    try{
        const tipoTala = await TipoTala.findOne( { nombre } );

        if( tipoTala )
            throw new Error(`Tipo de tala ya existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}