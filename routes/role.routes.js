import { Router } from 'express';
import * as Controller from '../controllers/role.controller';
import handler from './handler';
const router = new Router();

router.route('/role').post(Controller.addRole, handler);
router.route('/role').get(Controller.getAllRole, handler);
router.route('/role/:id').get(Controller.getRole, handler);
router.route('/role/:id').put(Controller.updateRole, handler);
router.route('/role/:id').delete(Controller.deleteRole, handler);

export default router;
