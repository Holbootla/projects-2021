import { Router } from 'express';
import { Category } from './category';
import {
  getCategory,
  getCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from './store';

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

router.delete('/:name', async (req, res) => {
  const categoryName = req.params.name.toString();

  if (!categoryName) {
    return res.sendStatus(400);
  }

  try {
    await deleteCategory(categoryName);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.post('/', async (req, res) => {
  const category: Category = req.body;

  try {
    await createCategory(category);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.put('/', async (req, res) => {
  const category: Category = req.body;

  try {
    await updateCategory(category);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(400).send(e);
  }
});

export default router;
