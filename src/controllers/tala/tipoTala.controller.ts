import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages'
import tipoTala from '../../models/tala/tipoTala';

export const getTipoTalaTipos = async ( req: Request, res : Response ) => {
    
    try {

        const tiposTala = await tipoTala.find({ active : true });

        res.json({ result : [...tiposTala] })

    } catch ( error ) {

        console.log( error )
        res.send([])

    }

}

export const createTipoTala = async ( req : Request, res : Response ) => {

    try{

        const { nombre } = req.body;

        const tipoTalaInstancia = new tipoTala({ nombre });

        await tipoTalaInstancia.save();

        res.json( tipoTalaInstancia );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear tipo de tala.'))

    }

}

export const borrarTipoTala = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;

        const tipoTalaD = await tipoTala.findByIdAndUpdate( _id, { active : false });

        res.json( tipoTalaD );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo borrar tipo de tala.'))

    }

}