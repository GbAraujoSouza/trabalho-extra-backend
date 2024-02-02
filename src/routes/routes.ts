import { Router } from 'express';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import VaccineController from '../controllers/vaccineController';
import PetController from '../controllers/petController';

const router = Router();

router.post('/login', AuthController.login);
router.get('/userInfo', AuthController.getDetails);

router.post('/user', UserController.create);
router.get('/user/:id', UserController.read);
router.get('/users', UserController.readAll);
router.put('/user/:id', UserController.update);
router.delete('/userDelete/:id', UserController.destroy);

router.post('/pet', PetController.create);
router.get('/pet/:id', PetController.read);
router.get('/pets', PetController.readAll);
router.put('/pet/:id', PetController.update);
router.delete('/petDelete/:id', PetController.destroy);
router.post('/takeVaccine', PetController.takeVaccine);
router.get('/pet/:idPet/vaccines', PetController.readPetVaccine);
router.delete(
  '/pet/:idPet/removeVaccine/:idVaccine',
  PetController.removeVaccine,
);

router.post('/vaccine', VaccineController.create);
router.get('/vaccine/:id', VaccineController.read);
router.get('/vaccines', VaccineController.readAll);
router.put('/vaccine/:id', VaccineController.update);
router.delete('/vaccineDelete/:id', VaccineController.destroy);

export default router;
