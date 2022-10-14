import { Router } from 'express'
import { check } from 'express-validator';
import { borrarTipoDrenajeSanitario, createTipoDrenajeSanitario, getDrenajeSanitarioTipos } from '../../controllers/serviciosPublicos/drenajeSanitario.controller';
import { existeDrenajeSanitario, noDrenajeSanitarioRepetido } from '../../helpers/db-validators/seviciosPublicos/drenajeSanitario.validator';
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
    getDrenajeSanitarioTipos
)

router.post(
    '/',
    [
        check('nombre', 'Se debe especificar el nombre del <Tipo de Drenaje Sanitario>').not().isEmpty(),
        check('nombre').custom( noDrenajeSanitarioRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    createTipoDrenajeSanitario
)

router.delete(
    '/:_id',
    [
        check('_id', 'Se debe especificar el id del <Tipo de Drenaje Sanitario>').not().isEmpty(),
        check('_id').custom( existeDrenajeSanitario ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    borrarTipoDrenajeSanitario
)

export default router;