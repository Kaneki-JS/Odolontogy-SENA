import { validationResult } from 'express-validator';


export function validarResultados(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }

    next();
  }


export default validarResultados;