import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages'
import TipoMovimientoTierra from '../../models/obra/tipoMovimientoTierra'

export const getTiposMoviemientoTierra = async ( req: Request, res : Response ) => {
    
    try {

        const movimientos = await TipoMovimientoTierra.find({ active: true });

        res.json({ result : [...movimientos] })

    } catch ( error ) {

        console.log( error )
        res.send([])

    }

}

export const createTipoMovimientoTierra = async ( req : Request, res : Response ) => {

    try{

        const { nombre } = req.body;

        const movimientoInstancia = new TipoMovimientoTierra({nombre});

        await movimientoInstancia.save();

        res.json( movimientoInstancia );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear movimiento de tierra.'))

    }

}


export const borrarTipoMovimientoTierra = async ( req : Request, res : Response ) => {

    try{

        const { _id } = req.params;

        const tipoMovimientoTierra = await TipoMovimientoTierra.findByIdAndUpdate( _id, { active : false });

        res.json( tipoMovimientoTierra );

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo borrar tipo de movimiento de tierra.'))

    }

}