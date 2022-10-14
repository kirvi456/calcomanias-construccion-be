import { Router } from 'express'
import { check } from 'express-validator';
import { borrarTipoAguaPotable, createTipoAguaPotable, getAguaPotableTipos } from '../../controllers/serviciosPublicos/aguaPotable.controller';
import { existeTipoAguaPotable, noAguaPotableRepetido } from '../../helpers/db-validators/seviciosPublicos/aguaPotable.validator';
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
    getAguaPotableTipos
)

router.post(
    '/',
    [
        check('nombre', 'Se debe especificar el nombre del <Tipo de Agua Potable>').not().isEmpty(),
        check('nombre').custom( noAguaPotableRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    createTipoAguaPotable
)

router.delete(
    '/:_id',
    [
        check('_id', 'Se debe especificar el id del <Tipo de Agua Potable>').not().isEmpty(),
        check('_id').custom( existeTipoAguaPotable ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    borrarTipoAguaPotable
)

export default router;