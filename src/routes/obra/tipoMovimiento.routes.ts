import { Router } from 'express'
import { check } from 'express-validator';
import { 
    borrarTipoMovimientoTierra,
    createTipoMovimientoTierra,
    getTiposMoviemientoTierra 
} from '../../controllers/obra/tipoMovimientoTierra.controller';
import { existeTipoMovimientoTierra, noMovimientoRepetido } from '../../helpers/db-validators/obra/tipomovimiento.validator';
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
    getTiposMoviemientoTierra
)

router.post(
    '/',
    [
        check('nombre', 'Se debe especificar el nombre del <Tipo de Movimiento de Tierra>').not().isEmpty(),
        check('nombre').custom( noMovimientoRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    createTipoMovimientoTierra
)

router.delete(
    '/:_id',
    [
        check('_id', 'Se debe especificar el id del <Tipo de Obra>').not().isEmpty(),
        check('_id').custom( existeTipoMovimientoTierra ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    borrarTipoMovimientoTierra
)

export default router;