import { Request, Response } from 'express'
import { formatFinalError } from '../helpers/error-messages';
import calcomania from '../models/calcomania';
import Formulario from '../models/formulario';

export const iniciarForm = async ( req : Request, res : Response ) => {

    try{
        
        const { no, fechaEntrega } = req.body;

        const userCreated = req.currentUser;

        const nuevoFormulario = new Formulario({ no, fechaEntrega, userCreated });

        await nuevoFormulario.save();

        res.json( nuevoFormulario );

    } catch ( error ) {        

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear crear formulario'))

    }
}

export const getForm = async ( req : Request, res : Response ) => {

    try{
        
        const { no } = req.params;

        const formulario =  await Formulario.findOne({ no })
        .populate('calcomania');
    
        if( !formulario ) throw new Error('No se encontro formulario')

        res.json( formulario );

    } catch ( error ) {        

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo obtener el formulario'))

    }
}

export const getForms = async ( req : Request, res : Response ) => {

    try{
        

        const formulario =  await Formulario.find({})
        .populate('calcomania');
    
        if( !formulario ) throw new Error('No se encontro formulario')

        res.json( formulario );

    } catch ( error ) {        

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo obtener el formulario'))

    }
}

export const getFormsDireccion = async ( req : Request, res : Response ) => {

    try{

        const { direccion, fechaIni, fechaFin } = req.query;


        const formulario =  await Formulario.find(
            { 
                $and: [
                    { 'inmueble.direccion': { $regex: direccion, $options: 'i' } },
                    { fechaEntrega: { $gte: fechaIni } },
                    { fechaEntrega: { $lte: fechaFin } },
                ]
            }
        )
        .populate('calcomania');
    
        if( !formulario ) throw new Error('No se encontro formulario')

        res.json( formulario );

    } catch ( error ) {        

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo obtener el formulario'))

    }
}

export const getFormsPropietario = async ( req : Request, res : Response ) => {

    try{

        const { propietario, fechaIni, fechaFin } = req.query;

        const formulario =  await Formulario.find(
            { 
                $and: [
                    {'propietario.nombres': { $regex: propietario, $options: 'i'}},
                    { fechaEntrega: { $gte: fechaIni } },
                    { fechaEntrega: { $lte: fechaFin } },
                ]
            }
        )
        .populate('calcomania');
    
        if( !formulario ) throw new Error('No se encontro formulario')

        res.json( formulario );

    } catch ( error ) {        

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo obtener el formulario'))

    }
}

export const getFormsFormulario = async ( req : Request, res : Response ) => {

    try{

        const { noForm, fechaIni, fechaFin } = req.query;


        const Realformulario =  await Formulario.find(
            { 
                $and: [
                    { no : noForm },
                    { fechaEntrega: { $gte: fechaIni } },
                    { fechaEntrega: { $lte: fechaFin } },
                ]
            }    
        )
        .populate('calcomania');
    
        if( !Realformulario ) throw new Error('No se encontro formulario')

        res.json( Realformulario );

    } catch ( error ) {        

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo obtener el formulario'))

    }
}

export const updatePropietario = async ( req : Request, res : Response ) => {

    try {

        const { no } = req.params;
        
        const {
            nombres,
            apellidos,
            direccion,
            telefonos,
            email,
            dpi,
            extendido
        } = req.body;

        const formulario = await Formulario.findOneAndUpdate(
            { 
                no 
            },
            {
                propietario: {
                    nombres,
                    apellidos,
                    direccion,
                    telefonos,
                    email,
                    dpi,
                    extendido
                }
            },
            {
                new: true
            } 
        );
        
        await formulario!.save();
        
        res.json( formulario )

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo actualizar propietario'))

    }

}

export const updateInmueble = async ( req : Request, res : Response ) => {

    try {

        const { no } = req.params;
        
        const {
            direccion,
            noFinca,
            folio,
            libro,
            area,
            frente,
            fondo,
            irregular
        } = req.body;

        const formulario = await Formulario.findOneAndUpdate(
            { 
                no 
            },
            {
                inmueble: {
                    direccion,
                    noFinca,
                    folio,
                    libro,
                    area,
                    frente,
                    fondo,
                    irregular
                }
            },
            {
                new: true
            } 
        );
        
        await formulario!.save();
        
        res.json( formulario )

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo actualizar inmueble'))

    }

}

export const updateObra = async ( req : Request, res : Response ) => {

    try {

        const { no } = req.params;
        
        const {
            tipo,
            area,
            movimientoTierra,
            demolicion,
            metrosCuadrados,
            metrosCubicos,
            meses,
            niveles,
            tipoUso,
            costoEstimado
        } = req.body;

        const formulario = await Formulario.findOneAndUpdate(
            { 
                no 
            },
            {
                obra: {
                    tipo,
                    area,                    
                    movimientoTierra,
                    metrosCubicos,
                    demolicion,
                    metrosCuadrados,
                    meses,
                    niveles,
                    tipoUso,
                    costoEstimado
                }
            },
            {
                new: true
            } 
        );
        
        await formulario!.save();
        
        res.json( formulario )

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo actualizar la obra'))

    }

}

export const updateServicios = async ( req : Request, res : Response ) => {

    try {

        const { no } = req.params;
        
        const {
            aguaPotable,
            drenajeSanitario,
            drenajePluvial,
            otros
        } = req.body;

        const formulario = await Formulario.findOneAndUpdate(
            { 
                no 
            },
            {
                servicios: {
                    aguaPotable,
                    drenajeSanitario,
                    drenajePluvial,
                    otros
                }
            },
            {
                new: true
            } 
        );
        
        await formulario!.save();
        
        res.json( formulario )

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo actualizar la lista de servicios'))

    }

}

export const updateTala = async ( req : Request, res : Response ) => {

    try {

        const { no } = req.params;
        const {
            necesario,
            tipo,
        } = req.body;
        
        const formulario = await Formulario.findOneAndUpdate(
            { 
                no 
            },
            {
                tala: {
                    necesario,
                    tipo,
                }
            },
            {
                new: true
            } 
        );
        
        await formulario!.save();
        
        res.json( formulario )

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo actualizar la opción de tala'))

    }

}

export const updatePlanificador = async ( req : Request, res : Response ) => {

    try {

        const { no } = req.params;
        
        const {
            nombres,
            apellidos,
            direccion,
            telefonos,
            email,
            dpi,
            extendido,
            colegiado,
            profesion
        } = req.body;

        const formulario = await Formulario.findOneAndUpdate(
            { 
                no 
            },
            {
                planificador: {
                    nombres,
                    apellidos,
                    direccion,
                    telefonos,
                    email,
                    dpi,
                    extendido,
                    colegiado,
                    profesion
                }
            },
            {
                new: true
            } 
        );
        
        await formulario!.save();
        
        res.json( formulario )

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo actualizar el planificador'))

    }

}

export const updateEjecutor = async ( req : Request, res : Response ) => {

    try {

        const { no } = req.params;
        
        const {
            nombres,
            apellidos,
            direccion,
            telefonos,
            email,
            dpi,
            extendido,
            colegiado,
            profesion
        } = req.body;

        const formulario = await Formulario.findOneAndUpdate(
            { 
                no 
            },
            {
                ejecutor: {
                    nombres,
                    apellidos,
                    direccion,
                    telefonos,
                    email,
                    dpi,
                    extendido,
                    colegiado,
                    profesion
                }
            },
            {
                new: true
            } 
        );
        
        await formulario!.save();
        
        res.json( formulario )

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo actualizar el ejecutor'))

    }

}

export const updateRecibo = async ( req : Request, res : Response ) => {

    try {

        const { no } = req.params;
        
        const {
            no7b,
            fecha,
            total
        } = req.body;

        const formulario = await Formulario.findOneAndUpdate(
            { 
                no 
            },
            {
                recibo: {
                    no7b,
                    fecha,
                    total
                }
            },
            {
                new: true
            } 
        );
        
        await formulario!.save();
        
        res.json( formulario )

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo actualizar el recibo'))

    }

}

export const updateCalcomania = async ( req : Request, res : Response ) => {

    try {


        const {
            norecibo,
            vencimiento,
            direccion,
            rubros
        } = req.body;

        const nuevaCalacomania = new calcomania({ 
            norecibo,
            vencimiento,
            direccion,
            rubros 
        });

        await nuevaCalacomania.save();

        const { no } = req.params;       
        

        const formulario = await Formulario.findOneAndUpdate(
            { 
                no 
            },
            {
                calcomania: nuevaCalacomania._id
            },
            {
                new: true
            } 
        );
        
        await formulario!.save();
        
        
        res.json( formulario )

    } catch ( error ){

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo actualizar el recibo'))

    }

}