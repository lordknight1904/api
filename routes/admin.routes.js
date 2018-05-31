import { Router } from 'express';
import * as Controller from '../controllers/admin.controller';
import handler from './handler';
const router = new Router();

router.route('/admin/authenticate').post(Controller.authenticate, handler);
router.route('/admin').get(Controller.getAllAdmin, handler);
router.route('/admin').post(Controller.addAdmin, handler);
router.route('/admin').put(Controller.updateAdmin, handler);
router.route('/admin').delete(Controller.deleteAdmin, handler);
router.route('/admin/:id').get(Controller.getAdmin, handler);

export default router;
