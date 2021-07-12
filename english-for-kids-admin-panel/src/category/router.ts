import { Router } from 'express';
import { getCategory, getCategories } from './store';

const router = Router();

router.get('/', async (req, res) => {
  const categories = await getCategories();
  return res.json(categories);
});

router.get('/:name', async (req, res) => {
  const categoryName = req.params.name.toString();
  if (!categoryName) {
    return res.sendStatus(400);
  }

  const category = await getCategory(categoryName);

  if (!category) {
    return res.sendStatus(404);
  }

  return res.json(category);
});

export default router;
