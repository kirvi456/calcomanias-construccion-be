import Calcomania from "../../models/calcomania";
import Formulario from "../../models/formulario";
import { getErrorMessage } from "../error-messages";

export const formularioNoRepetido = async ( no : Number = 0 ) => {

    try{

        const formulario = await Formulario.findOne( { no } );

        if( formulario )
            throw new Error(`El formulario <${ no }> ya se encuentra registrado`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
    
}

export const existeFormulario = async ( no : Number = 0 ) => {

    try{

        const formulario = await Formulario.findOne( { no } );

        if( !formulario )
            throw new Error(`No se encontró el formulario`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }

}

export const comprobarReciboCalcomania = async ( norecibo : Number = 0 ) => {

    try{

        const calcomania = await Calcomania.findOne( { norecibo } );

        if( calcomania )
            throw new Error(`Ya se encuentra una calcomania registrada con ese recibo <${ norecibo }>. ${ calcomania.direccion }`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
    
}