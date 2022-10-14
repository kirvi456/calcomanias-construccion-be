import { Router } from 'express'
import { check } from 'express-validator';
import { borrarTipoObra, createTipoObra, getTiposObra } from '../../controllers/obra/tipoObra.controller';
import { existeTipoObra, noTipoObraRepetido } from '../../helpers/db-validators/obra/tipoObra.validator';

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
    getTiposObra
)

router.post(
    '/',
    [
        check('nombre', 'Se debe especificar el nombre del <Tipo de Obra>').not().isEmpty(),
        check('nombre').custom( noTipoObraRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    createTipoObra
)

router.delete(
    '/:_id',
    [
        check('_id', 'Se debe especificar el id del <Tipo de Obra>').not().isEmpty(),
        check('_id').custom( existeTipoObra ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    borrarTipoObra
)

export default router;