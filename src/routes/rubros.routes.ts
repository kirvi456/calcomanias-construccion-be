import { Router } from "express";
import { check } from "express-validator";
import { borrarRubro, crearRubro, getRubros } from "../controllers/rubros.controller";
import { existeRubro, rubroNoRepetido } from "../helpers/db-validators/rubro.validator";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import { esAdmin } from "../middlewares/validar-roles";

const router = Router();

router.get(
    '/',
    [
        validarJWT,
        validarCampos
    ],
    getRubros
)

router.post(
    '/',
    [
        check('no', 'Se debe especificar el número del rubro').not().isEmpty(),
        check('desc', 'Se debe especificar la descripción del rubro').not().isEmpty(),
        check('unidad', 'Se debe especificar la si contiene dimensión').not().isEmpty(),
        check('unidadDesc', 'Se debe especificar la unidad del rubro').not().isEmpty(),

        check('no').custom( rubroNoRepetido ),

        validarJWT,
        esAdmin,
        validarCampos
    ],
    crearRubro
)

router.delete(
    '/:_id',
    [
        check('_id', 'Se debe especificar el id del <Tipo de Tala>').not().isEmpty(),
        check('_id').custom( existeRubro ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    borrarRubro
)

export default router;