import { Router } from 'express'
import { check } from 'express-validator';
import { getForm, getFormsDireccion, getForms, iniciarForm, updateCalcomania, updateEjecutor, updateInmueble, updateObra, updatePlanificador, updatePropietario, updateRecibo, updateServicios, updateTala, getFormsPropietario, getFormsFormulario } from '../controllers/formularios.controller';
import { comprobarReciboCalcomania, existeFormulario, formularioNoRepetido } from '../helpers/db-validators/formulario.validator';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

const router = Router();

router.post(
    '/',
    [
        check('no', 'Se debe de especificar el número de formulario').not().isEmpty(),
        check('fechaEntrega', 'Se debe de especificar la fecha de entrega del formulario').not().isEmpty(),
        check('no').custom( formularioNoRepetido ),
        validarJWT,
        validarCampos
    ],
    iniciarForm
)




router.get(
    '/',
    [
        validarJWT,
        validarCampos
    ],
    getForms
)

router.get(
    '/direccion',
    [        
        check('direccion', 'Se debe de especificar la dirección').not().isEmpty(),
        check('fechaIni', 'Se debe de especificar la fecha inicial').not().isEmpty(),
        check('fechaIni', 'Se debe de especificar la fecha inicial').isNumeric(),
        check('fechaFin', 'Se debe de especificar la fecha final').not().isEmpty(),
        check('fechaFin', 'Se debe de especificar la fecha final').isNumeric(),
        validarJWT,
        validarCampos
    ],
    getFormsDireccion
)

router.get(
    '/propietario',
    [        
        check('propietario', 'Se debe de especificar el nombre del propietario').not().isEmpty(),
        check('fechaIni', 'Se debe de especificar la fecha inicial').not().isEmpty(),
        check('fechaIni', 'Se debe de especificar la fecha inicial').isNumeric(),
        check('fechaFin', 'Se debe de especificar la fecha final').not().isEmpty(),
        check('fechaFin', 'Se debe de especificar la fecha final').isNumeric(),
        validarJWT,
        validarCampos
    ],
    getFormsPropietario
)

router.get(
    '/formulario',
    [        
        check('noForm', 'Se debe de especificar el número de formulario').not().isEmpty(),
        check('noForm', 'Se debe de especificar el número de formulario').isNumeric(),
        check('fechaIni', 'Se debe de especificar la fecha inicial').not().isEmpty(),
        check('fechaIni', 'Se debe de especificar la fecha inicial').isNumeric(),
        check('fechaFin', 'Se debe de especificar la fecha final').not().isEmpty(),
        check('fechaFin', 'Se debe de especificar la fecha final').isNumeric(),
        validarJWT,
        validarCampos
    ],
    getFormsFormulario
)

router.get(
    '/:no',
    [
        check('no', 'Se debe de especificar el número de formulario').not().isEmpty(),
        validarJWT,
        validarCampos
    ],
    getForm
)

router.put(
    '/actualizarpropietario/:no',
    [
        check('nombres', 'Se deben de especificar los nombres del propietario').not().isEmpty(),
        check('apellidos', 'Se deben de especificar los apellidos del propietario').not().isEmpty(),
        check('direccion', 'Se debe de especificar la dirección del propietario').not().isEmpty(),
        check('telefonos', 'Se debe de especificar el telefono del propietario').isArray(),
        check('email', 'Se debe de especificar el email del propietario').not().isEmpty(),
        check('dpi', 'Se debe de especificar el DPI del propietario').not().isEmpty(),
        check('extendido', 'Se debe de especificar donde se extendio el DPI').not().isEmpty(),

        check('no').custom( existeFormulario ),
        validarJWT,
        validarCampos
    ],
    updatePropietario
)

router.put(
    '/actualizarimnueble/:no',
    [
        check('direccion', 'Se deben de especificar la dirección del inmueble').not().isEmpty(),
        check('noFinca', 'Se deben de especificar el número de finca').not().isEmpty(),
        check('folio', 'Se debe de especificar el folio').not().isEmpty(),
        check('libro', 'Se debe de especificar el libro').not().isEmpty(),
        check('area', 'Se debe de especificar el area en metros cuadrados').not().isEmpty(),
        check('area', 'Se debe de especificar el area en metros cuadrados').isNumeric(),
        check('frente', 'Se debe de especificar el frente en metros').not().isEmpty(),
        check('frente', 'Se debe de especificar el frente en metros').isNumeric(),
        check('fondo', 'Se debe de especificar el fondo en metros').not().isEmpty(),
        check('fondo', 'Se debe de especificar el fondo en metros').isNumeric(),
        check('irregular', 'Se debe de especificar si es terreno irregular').not().isEmpty(),

        check('no').custom( existeFormulario ),
        validarJWT,
        validarCampos
    ],
    updateInmueble
)

router.put(
    '/actualizarobra/:no',
    [
        check('tipo', 'Se debe de especificar el tipo de obra').not().isEmpty(),
        check('area', 'Se debe de especificar el area a construir').not().isEmpty(),
        check('movimientoTierra', 'Se debe de especificar si se hará movimiento de tierra').not().isEmpty(),
        check('demolicion', 'Se deben de especificar si se hará demolición').not().isEmpty(),
        check('metrosCuadrados', 'Se deben de especificar los metros cuadrados').not().isEmpty(),
        check('metrosCuadrados', 'Se deben de especificar los metros cuadrados').isNumeric(),
        check('metrosCubicos', 'Se deben de especificar los metros cúbicos').not().isEmpty(),
        check('metrosCubicos', 'Se deben de especificar los metros cúbicos').isNumeric(),
        check('meses', 'Se deben de especificar los meses estimados').not().isEmpty(),
        check('meses', 'Se deben de especificar los meses estimados').isNumeric(),
        check('niveles', 'Se deben de especificar los niveles de la obra').isArray(),
        check('tipoUso', 'Se debe de especificar el tipo de uso').not().isEmpty(),
        check('costoEstimado', 'Se debe de especificar el costo estimado').not().isEmpty(),
        check('costoEstimado', 'Se debe de especificar el costo estimado').isNumeric(),
        

        check('no').custom( existeFormulario ),
        validarJWT,
        validarCampos
    ],
    updateObra
)

router.put(
    '/actualizarservicios/:no',
    [
        check('aguaPotable', 'Se debe de especificar el agua potable').not().isEmpty(),
        check('drenajeSanitario', 'Se debe de especificar el drenaje sanitario').not().isEmpty(),
        check('drenajePluvial', 'Se debe de especificar el drenaje pluvial').not().isEmpty(),
        check('otros', 'Incorrecto otros').isArray(),
        
        

        check('no').custom( existeFormulario ),
        validarJWT,
        validarCampos
    ],
    updateServicios
)

router.put(
    '/actualizartala/:no',
    [
        check('necesario', 'Se debe de especificar si se realizará tala de árboles').not().isEmpty(),
        

        check('no').custom( existeFormulario ),
        validarJWT,
        validarCampos
    ],
    updateTala
)

router.put(
    '/actualizarplanificador/:no',
    [
        check('nombres', 'Se deben de especificar los nombres del planificador').not().isEmpty(),
        check('apellidos', 'Se deben de especificar los apellidos del planificador').not().isEmpty(),
        check('direccion', 'Se debe de especificar la dirección del planificador').not().isEmpty(),
        check('telefonos', 'Se debe de especificar el telefono del planificador').isArray(),
        check('email', 'Se debe de especificar el email del planificador').not().isEmpty(),
        check('dpi', 'Se debe de especificar el DPI del planificador').not().isEmpty(),
        check('extendido', 'Se debe de especificar donde se extendio el DPI').not().isEmpty(),
        check('profesion', 'Se debe de especificar la profesión del planificador').not().isEmpty(),
        check('colegiado', 'Se debe de especificar si el planificador esta colegiado').not().isEmpty(),
        
        check('no').custom( existeFormulario ),
        validarJWT,
        validarCampos
    ],
    updatePlanificador
)

router.put(
    '/actualizarejecutor/:no',
    [
        check('nombres', 'Se deben de especificar los nombres del ejecutor').not().isEmpty(),
        check('apellidos', 'Se deben de especificar los apellidos del ejecutor').not().isEmpty(),
        check('direccion', 'Se debe de especificar la dirección del ejecutor').not().isEmpty(),
        check('telefonos', 'Se debe de especificar el telefono del ejecutor').isArray(),
        check('email', 'Se debe de especificar el email del ejecutor').not().isEmpty(),
        check('dpi', 'Se debe de especificar el DPI del ejecutor').not().isEmpty(),
        check('extendido', 'Se debe de especificar donde se extendio el DPI').not().isEmpty(),
        check('profesion', 'Se debe de especificar la profesión del ejecutor').not().isEmpty(),
        check('colegiado', 'Se debe de especificar si el ejecutor esta colegiado').not().isEmpty(),
        
        check('no').custom( existeFormulario ),
        validarJWT,
        validarCampos
    ],
    updateEjecutor
)


router.put(
    '/actualizarrecibo/:no',
    [
        check('no7b', 'Se debe de especificar el número de recibo 7B').not().isEmpty(),
        check('no7b', 'Se debe de especificar el número de recibo 7B').isNumeric(),
        check('fecha', 'Se debe de especificar la fecha de recibo 7B').not().isEmpty(),
        check('fecha', 'Se debe de especificar la fecha de recibo 7B').isNumeric(),
        check('no7b', 'Se debe de especificar el número de recibo 7B').isNumeric(),
        check('total', 'Se debe de especificar el total de recibo 7B').not().isEmpty(),
        check('total', 'Se debe de especificar el total de recibo 7B').isNumeric(),


        check('no').custom( existeFormulario ),
        validarJWT,
        validarCampos
    ],
    updateRecibo
)


router.put(
    '/actualizarcalcomania/:no',
    [
        check('direccion', 'Se debe de especificar el número de recibo 7B').not().isEmpty(),
        check('vencimiento', 'Se debe de especificar la fecha de vencimiento').not().isEmpty(),
        check('vencimiento', 'Se debe de especificar la fecha de vencimiento').isNumeric(),
        check('norecibo', 'Se debe de especificar el número de recibo').not().isEmpty(),
        check('norecibo', 'Se debe de especificar el número de recibo').isNumeric(),
        check('rubros', 'Se debe de especificar el número de recibo 7B').isArray(),

        check('norecibo').custom( comprobarReciboCalcomania ),

        check('no').custom( existeFormulario ),
        validarJWT,
        validarCampos
    ],
    updateCalcomania
)

export default router;