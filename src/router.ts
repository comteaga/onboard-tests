import { Router } from 'express';
import { cpfController } from './app/controllers/cpfController';
import { homeController } from './app/controllers/homeController';

const router: Router = Router();

router.get('/', homeController.home);
router.get('/verifyCpf/:cpf', cpfController.verifyCpf);


export { router };
