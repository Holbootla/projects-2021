import { Router } from 'express';
import { User } from './user';
import isUserExist from './store';

const router = Router();

router.post('/', async (req, res) => {
  const currentUser: User = req.body;
  const isExist = await isUserExist(currentUser);
  return res.json(isExist);
});

export default router;
