import Rubro from "../../models/rubro";
import { getErrorMessage } from "../error-messages";

export const rubroNoRepetido = async ( no : String = '' ) => {

    try{

        const rubro = await Rubro.findOne( { no } );

        if( rubro )
            throw new Error(`El rubro <${ no }> ya se encuentra registrado`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
    
}

export const existeRubro = async ( no : String = '' ) => {

    try{

        const rubro = await Rubro.findById( no );

        if( !rubro )
            throw new Error(`El rubro <${ no }> no se encuentra registrado`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
    
}