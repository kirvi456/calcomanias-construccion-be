import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages'
import aguaPotable from '../../models/serviciosPublicos/aguaPotable';

export const getAguaPotableTipos = async ( req: Request, res : Response ) => {
    
    try {

        const tiposAguaPotable = await aguaPotable.find({ active : true });

        res.json({ result : [...tiposAguaPotable] })

    } catch ( error ) {

        console.log( error )
        res.send([])

    }

}

export const createTipoAguaPotable = async ( req : Request, res : Response ) => {

    try{

        const { nombre } = req.body;

        const tipoAguaPotableInstancia = new aguaPotable({ nombre });

        await tipoAguaPotableInstancia.save();

        res.json( tipoAguaPotableInstancia );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear tipo de agua potable.'))

    }

}

export const borrarTipoAguaPotable = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;

        const tipoAgua = await aguaPotable.findByIdAndUpdate( _id, { active : false });

        res.json( tipoAgua );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo borrar tipo de Agua Potable.'))

    }

}