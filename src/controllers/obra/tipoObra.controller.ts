import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages'
import TipoObra from '../../models/obra/tipoObra'

export const getTiposObra = async ( req: Request, res : Response ) => {
    
    try {

        const tiposObra = await TipoObra.find({ active: true });

        res.json({ result : [...tiposObra] })

    } catch ( error ) {

        console.log( error )
        res.send([])

    }

}

export const createTipoObra = async ( req : Request, res : Response ) => {

    try{

        const { nombre } = req.body;

        const tipoObraInstancia = new TipoObra({nombre});

        await tipoObraInstancia.save();

        res.json( tipoObraInstancia );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear tipo de obra.'))

    }

}


export const borrarTipoObra = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;

        const tipoObra = await TipoObra.findByIdAndUpdate( _id, { active : false });

        res.json( tipoObra );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo borrar tipo de obra.'))

    }

}