import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages'
import drenagePluvial from '../../models/serviciosPublicos/drenajePluvial';

export const getDrenagePluvialTipos = async ( req: Request, res : Response ) => {
    
    try {

        const tiposDrenagePluvial = await drenagePluvial.find({ active : true });

        res.json({ result : [...tiposDrenagePluvial] })

    } catch ( error ) {

        console.log( error )
        res.send([])

    }

}

export const createTipoDrenagePluvial = async ( req : Request, res : Response ) => {

    try{

        const { nombre } = req.body;

        const tipoDrenageSanitarioInstancia = new drenagePluvial({ nombre });

        await tipoDrenageSanitarioInstancia.save();

        res.json( tipoDrenageSanitarioInstancia );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear tipo de agua potable.'))

    }

}

export const borrarTipoDrenajePluvial = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;

        const tipoDrenajePluvial = await drenagePluvial.findByIdAndUpdate( _id, { active : false });

        res.json( tipoDrenajePluvial );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo borrar tipo de Drenaje Pluvial.'))

    }

}