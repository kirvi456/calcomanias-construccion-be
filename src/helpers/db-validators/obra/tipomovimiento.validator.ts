import TipoMovimientoTierra from "../../../models/obra/tipoMovimientoTierra";
import { getErrorMessage } from "../../error-messages";

export const existeTipoMovimientoTierra = async ( _id = '') => {

    try{
        const tipoMovimientoTierra = await TipoMovimientoTierra.findById( _id );

        if( !tipoMovimientoTierra )
            throw new Error(`Tipo de movimiento de tierra no existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}

export const noMovimientoRepetido = async ( nombre = '') => {

    try{
        const movimiento = await TipoMovimientoTierra.findOne( { nombre } );

        if( movimiento )
            throw new Error(`Movimiento ya existe`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }


}