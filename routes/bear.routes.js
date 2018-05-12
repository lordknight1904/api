import { Router } from 'express';
import * as Controller from '../controllers/bear.controller';
import handler from './handler';
const router = new Router();

router.route('/bear').post(Controller.addBear, handler);
router.route('/bear').get(Controller.getAllBear, handler);
router.route('/bear/:id').get(Controller.getBear, handler);
router.route('/bear/:id').put(Controller.updateBear, handler);
router.route('/bear/:id').delete(Controller.deleteBear, handler);

export default router;
