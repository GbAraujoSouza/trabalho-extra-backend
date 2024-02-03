import { Router } from 'express';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import VaccineController from '../controllers/vaccineController';
import PetController from '../controllers/petController';
import {
  validatorUser,
  validatorPet,
  validatorVaccine,
  validatorLogin,
} from '../config/validator';

import { photoUpload, textUpload } from '../config/files';

const router = Router();

router.post('/login', validatorLogin('login')!, AuthController.login);
router.get('/userInfo', AuthController.getDetails);

router.post('/user', validatorUser('create')!, UserController.create);
router.get('/user/:id', validatorUser('read')!, UserController.read);
router.get('/users', UserController.readAll);
router.put('/user/:id', validatorUser('update')!, UserController.update);
router.delete(
  '/userDelete/:id',
  validatorUser('destroy')!,
  UserController.destroy,
);

router.post('/pet', validatorPet('create')!, PetController.create);
router.get('/pet/:id', validatorPet('read')!, PetController.read);
router.get('/pets', PetController.readAll);
router.put('/pet/:id', validatorPet('update')!, PetController.update);
router.delete(
  '/petDelete/:id',
  validatorPet('destroy')!,
  PetController.destroy,
);
router.post('/takeVaccine', PetController.takeVaccine);
router.get('/pet/:idPet/vaccines', PetController.readPetVaccine);
router.delete(
  '/pet/:idPet/removeVaccine/:idVaccine',
  PetController.removeVaccine,
);

router.post('/vaccine', validatorVaccine('create')!, VaccineController.create);
router.get('/vaccine/:id', validatorVaccine('read')!, VaccineController.read);
router.get('/vaccines', VaccineController.readAll);
router.put(
  '/vaccine/:id',
  validatorVaccine('update')!,
  VaccineController.update,
);
router.delete(
  '/vaccineDelete/:id',
  validatorVaccine('destroy')!,
  VaccineController.destroy,
);

router.post('/user/profileImage/', photoUpload.single('profileImage'));
router.post('/user/text/', textUpload.single('text'));

export default router;
