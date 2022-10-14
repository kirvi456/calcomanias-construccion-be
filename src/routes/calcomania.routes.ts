import { Router } from 'express'
import { check } from 'express-validator';
import { obtenerCodigoQR } from '../controllers/calcomania';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

const router = Router();

router.get(
    '/:_id',
    [
        validarJWT,
        validarCampos
    ],
    obtenerCodigoQR
)

export default router;