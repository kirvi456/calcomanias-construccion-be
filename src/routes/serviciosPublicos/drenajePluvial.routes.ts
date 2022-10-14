import { Router } from 'express'
import { check } from 'express-validator';
import { borrarTipoDrenajePluvial, createTipoDrenagePluvial, getDrenagePluvialTipos } from '../../controllers/serviciosPublicos/drenajePluvial.controller';
import { existeDrenajePluvial, noDrenagePluvialRepetido } from '../../helpers/db-validators/seviciosPublicos/drenajePluvial.validator';
import validarCampos from '../../middlewares/validar-campos';
import validarJWT from '../../middlewares/validar-jwt';
import { esAdmin } from '../../middlewares/validar-roles';

const router = Router();

router.get(
    '/',
    [
        validarJWT,
        validarCampos
    ],
    getDrenagePluvialTipos
)

router.post(
    '/',
    [
        check('nombre', 'Se debe especificar el nombre del <Tipo de Drenaje Pluvial>').not().isEmpty(),
        check('nombre').custom( noDrenagePluvialRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    createTipoDrenagePluvial
)

router.delete(
    '/:_id',
    [
        check('_id', 'Se debe especificar el id del <Tipo de Drenaje Pluvial>').not().isEmpty(),
        check('_id').custom( existeDrenajePluvial ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    borrarTipoDrenajePluvial
)

export default router;