import { Request, Response } from 'express'
import { formatFinalError } from '../helpers/error-messages';
import Rubro from "../models/rubro";

export const getRubros = async ( req: Request, res : Response ) => {
    
    try {

        const rubros = await Rubro.find({ active : true });

        res.json({ result : [...rubros] })

    } catch ( error ) {

        console.log( error )
        res.send([])

    }

}


export const crearRubro = async ( req : Request, res : Response ) => {

    try{
        
        const { no, desc, unidad, unidadDesc } = req.body;

        const userCreated = req.currentUser;

        console.log(unidad)

        const nuevoRubro = new Rubro({ no, desc, unidad, unidadDesc, userCreated });

        await nuevoRubro.save();

        res.json( nuevoRubro );

    } catch ( error ) {        

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear crear el rubro'))

    }
}

export const borrarRubro = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;

        const rubro = await Rubro.findByIdAndUpdate( _id, { active : false });

        res.json( rubro );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo borrar el rubro.'))

    }

}