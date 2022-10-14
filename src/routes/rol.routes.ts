import { Router } from 'express'
import { crearRol } from '../controllers/rol.controller';

const router = Router();

router.post(
    '/',
    [],
    crearRol
)

export default router;