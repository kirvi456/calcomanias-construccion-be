import { Router } from 'express'
import { check } from 'express-validator';
import { borrarTipoTala, createTipoTala, getTipoTalaTipos } from '../../controllers/tala/tipoTala.controller';
import { existeTipoTala, noTipoTalaRepetido } from '../../helpers/db-validators/tala/tipoTala.validator';

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
    getTipoTalaTipos
)

router.post(
    '/',
    [
        check('nombre', 'Se debe especificar el nombre del <Tipo de Tala>').not().isEmpty(),
        check('nombre').custom( noTipoTalaRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    createTipoTala
)

router.delete(
    '/:_id',
    [
        check('_id', 'Se debe especificar el id del <Tipo de Tala>').not().isEmpty(),
        check('_id').custom( existeTipoTala ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    borrarTipoTala
)


export default router;