import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages'
import drenajeSanitario from '../../models/serviciosPublicos/drenajeSanitario';

export const getDrenajeSanitarioTipos = async ( req: Request, res : Response ) => {
    
    try {

        const tiposDrenajeSanitario = await drenajeSanitario.find({ active : true });

        res.json({ result : [...tiposDrenajeSanitario] })

    } catch ( error ) {

        console.log( error )
        res.send([])

    }

}

export const createTipoDrenajeSanitario = async ( req : Request, res : Response ) => {

    try{

        const { nombre } = req.body;

        const tipoDrenageSanitarioInstancia = new drenajeSanitario({ nombre });

        await tipoDrenageSanitarioInstancia.save();

        res.json( tipoDrenageSanitarioInstancia );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear tipo de agua potable.'))

    }

}

export const borrarTipoDrenajeSanitario = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;

        const tiposDrenajeSanitario = await drenajeSanitario.findByIdAndUpdate( _id, { active : false });

        res.json( tiposDrenajeSanitario );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo borrar tipo de Drenaje Sanitario.'))

    }

}