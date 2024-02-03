import { body, param } from 'express-validator';

function validatorUser(method: string) {
  switch (method) {
    case 'create': {
      return [
        body('cpf')
          .exists()
          .withMessage('O campo não pode ser nulo')
          .isLength({ min: 11, max: 11 })
          .withMessage('O cpf deve possuir 11 números')
          .isString()
          .withMessage('O cpf deve ser passado como String'),

        body('email')
          .exists()
          .withMessage('O campo não pode ser nulo')
          .isLength({ min: 1 })
          .withMessage('O corpo de email deve ser preenchido')
          .isEmail()
          .withMessage('Precisa ser como exemplo@exemplo'),

        body('address')
          .exists()
          .withMessage('O campo não pode ser nulo')
          .isLength({ min: 1 })
          .withMessage('O endereço nao poder ser vazio')
          .isString()
          .withMessage('O endereço deve ser passado como String'),

        body('password')
          .exists()
          .withMessage('O campo não pode ser nulo')
          .isStrongPassword()
          .withMessage(
            'A senha deve conter no mínimo: 1 caractere maiúsculo e minúsculo, 1 número e 1 caractere especial',
          )
          .isString()
          .withMessage('A senha deve ser passada como string'),

        body('firstName')
          .exists()
          .withMessage('O campo não pode ser nulo')
          .isLength({ min: 1 })
          .withMessage('O primeiro nome deve ser preenchido')
          .isString()
          .withMessage('Valor deve ser uma string'),

        body('lastName')
          .exists()
          .withMessage('O campo não pode ser nulo')
          .isLength({ min: 1 })
          .withMessage('O sobrenome deve ser preenchido')
          .isString()
          .withMessage('Valor deve ser uma string'),
      ];
      break;
    }
    case 'read': {
      return [
        param('id')
          .exists()
          .withMessage('indique um valor de id')
          .isLength({ min: 1 })
          .withMessage('o id não pode ser vazio')
          .isNumeric()
          .withMessage('o valor de id deve ser numérico'),
      ];
      break;
    }
    case 'update': {
      return [
        param('id')
          .exists()
          .withMessage('indique um valor de id')
          .isLength({ min: 1 })
          .withMessage('o id não pode ser vazio')
          .isNumeric()
          .withMessage('o valor de id deve ser numérico'),

        body('cpf')
          .optional()
          .escape()
          .isLength({ min: 11, max: 11 })
          .withMessage('O cpf deve possuir 11 números')
          .isString()
          .withMessage('O cpf deve ser passado como String'),

        body('email')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O corpo de email deve ser preenchido')
          .isEmail()
          .withMessage('Precisa ser como exemplo@exemplo'),

        body('address')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O endereço nao poder ser vazio')
          .isString()
          .withMessage('O endereço deve ser passado como String'),

        body('password')
          .optional()
          .escape()
          .isStrongPassword()
          .withMessage(
            'A senha deve conter no mínimo: 1 caractere maiúsculo e minúsculo, 1 número e 1 caractere especial',
          )
          .isString()
          .withMessage('A senha deve ser passada como string'),

        body('firstName')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O primeiro nome deve ser preenchido')
          .isString()
          .withMessage('Valor deve ser uma string'),

        body('lastName')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O sobrenome deve ser preenchido')
          .isString()
          .withMessage('Valor deve ser uma string'),
      ];
      break;
    }
    case 'destroy': {
      return [
        param('id')
          .exists()
          .withMessage('indique um valor de id')
          .isLength({ min: 1 })
          .withMessage('o id não pode ser vazio')
          .isNumeric()
          .withMessage('o valor de id deve ser numérico'),
      ];
    }
  }
}

function validatorPet(method: string) {
  switch (method) {
    case 'create': {
      return [
        body('type')
          .exists()
          .withMessage('O campo é obrigatório')
          .isLength({ min: 1 })
          .withMessage('O campo nao pode ser vazio')
          .isString()
          .withMessage('O tipo de animal deve ser passado como String'),

        body('breed')
          .exists()
          .withMessage('O campo é obrigatório')
          .isLength({ min: 1 })
          .withMessage('O campo não pode ser vazio')
          .isString()
          .withMessage('A raça do animal deve ser passada como String'),

        body('name')
          .exists()
          .withMessage('O campo é obrigatório')
          .isLength({ min: 1 })
          .withMessage('O campo nao pode ser vazio')
          .isString()
          .withMessage('O nome deve ser passado como String'),

        body('age')
          .exists()
          .withMessage('O campo é obrigatório')
          .isLength({ min: 1 })
          .withMessage('O campo nao pode ser vazio')
          .isNumeric()
          .withMessage('A idade deve ser um número')
          .isInt()
          .withMessage('A senha deve ser passada como um Inteiro'),
      ];
      break;
    }
    case 'read': {
      return [
        param('id')
          .exists()
          .withMessage('indique um valor de id')
          .isLength({ min: 1 })
          .withMessage('o id não pode ser vazio')
          .isNumeric()
          .withMessage('o valor de id deve ser numérico'),
      ];
      break;
    }
    case 'update': {
      return [
        param('id')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('o id não pode ser vazio')
          .isNumeric()
          .withMessage('o valor de id deve ser numérico'),

        body('type')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O campo nao pode ser vazio')
          .isString()
          .withMessage('O tipo de animal deve ser passado como String'),

        body('breed')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O campo não pode ser vazio')
          .isString()
          .withMessage('A raça do animal deve ser passada como String'),

        body('name')
          .optional()
          .isLength({ min: 1 })
          .withMessage('O campo nao pode ser vazio')
          .isString()
          .withMessage('O nome deve ser passado como String'),

        body('age')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O campo nao pode ser vazio')
          .isNumeric()
          .withMessage('A idade deve ser um número')
          .isInt()
          .withMessage('A senha deve ser passada como um Inteiro'),
      ];
      break;
    }
    case 'destroy': {
      return [
        param('id')
          .exists()
          .withMessage('indique um valor de id')
          .isLength({ min: 1 })
          .withMessage('o id não pode ser vazio')
          .isNumeric()
          .withMessage('o valor de id deve ser numérico'),
      ];
    }
  }
}

function validatorVaccine(method: string) {
  switch (method) {
    case 'create': {
      return [
        body('name')
          .exists()
          .withMessage('O campo é obrigatório')
          .isLength({ min: 1 })
          .withMessage('O campo nao pode ser vazio')
          .isString()
          .withMessage('O nome da vacina deve ser passado como String'),

        body('dosage')
          .exists()
          .withMessage('O campo é obrigatório')
          .isLength({ min: 1 })
          .withMessage('O campo nao pode ser vazio')
          .isNumeric()
          .withMessage('A dose deve ser um número')
          .isInt()
          .withMessage('A dose deve ser passada como um Inteiro'),

        body('date')
          .optional()
          .escape()
          .isISO8601()
          .withMessage('Passe a data no formato YY-MM-DDThh:mm:ssZ'),

        body('nextDosageDate')
          .optional()
          .escape()
          .isISO8601()
          .withMessage('Passe a data no formato YY-MM-DDThh:mm:ssZ'),

        body('lotNumber')
          .exists()
          .withMessage('O campo não pode ser nulo')
          .isLength({ min: 1 })
          .withMessage('O lote deve ser preenchido')
          .isString()
          .withMessage('Valor deve ser uma string'),

        body('manufacturer')
          .exists()
          .withMessage('O campo não pode ser nulo')
          .isLength({ min: 1 })
          .withMessage('O fabricante deve ser preenchido')
          .isString()
          .withMessage('Valor deve ser uma string'),
      ];
      break;
    }
    case 'read': {
      return [
        param('id')
          .exists()
          .withMessage('indique um valor de id')
          .isLength({ min: 1 })
          .withMessage('o id não pode ser vazio')
          .isNumeric()
          .withMessage('o valor de id deve ser numérico'),
      ];
      break;
    }
    case 'update': {
      return [
        param('id')
          .exists()
          .withMessage('indique um valor de id')
          .isLength({ min: 1 })
          .withMessage('o id não pode ser vazio')
          .isNumeric()
          .withMessage('o valor de id deve ser numérico'),

        body('name')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O campo nao pode ser vazio')
          .isString()
          .withMessage('O nome da vacina deve ser passado como String'),

        body('dosage')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O campo nao pode ser vazio')
          .isNumeric()
          .withMessage('A dose deve ser um número')
          .isInt()
          .withMessage('A dose deve ser passada como um Inteiro'),

        body('date')
          .optional()
          .escape()
          .isISO8601()
          .withMessage('Passe a data no formato YY-MM-DDThh:mm:ssZ'),

        body('nextDosageDate')
          .optional()
          .escape()
          .isISO8601()
          .withMessage('Passe a data no formato YY-MM-DDThh:mm:ssZ'),

        body('lotNumber')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O lote deve ser preenchido')
          .isString()
          .withMessage('Valor deve ser uma string'),

        body('manufacturer')
          .optional()
          .escape()
          .isLength({ min: 1 })
          .withMessage('O fabricante deve ser preenchido')
          .isString()
          .withMessage('Valor deve ser uma string'),
      ];
      break;
    }
    case 'destroy': {
      return [
        param('id')
          .exists()
          .withMessage('indique um valor de id')
          .isLength({ min: 1 })
          .withMessage('o id não pode ser vazio')
          .isNumeric()
          .withMessage('o valor de id deve ser numérico'),
      ];
    }
  }
}

function validatorLogin(method: string) {
  switch (method) {
    case 'login': {
      return [
        body('email')
          .exists()
          .withMessage('O campo não pode ser nulo')
          .isLength({ min: 1 })
          .withMessage('O corpo de email deve ser preenchido')
          .isEmail()
          .withMessage('Precisa ser como exemplo@exemplo'),
      ];
    }
  }
}

export { validatorUser, validatorPet, validatorVaccine, validatorLogin };
