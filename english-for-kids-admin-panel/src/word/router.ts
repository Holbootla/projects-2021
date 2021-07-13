import { Router } from 'express';
import { getCategory } from 'category/store';
import { Word } from './word';
import {
  getWords,
  getWordsByCategory,
  getWord,
  deleteWord,
  createWord,
  updateWord,
} from './store';

const router = Router();

router.get('/', async (req, res) => {
  const words = await getWords();
  return res.json(words);
});

router.get('/category=:name', async (req, res) => {
  const categoryName = req.params.name;
  if (!categoryName) {
    return res.sendStatus(400);
  }

  const words = await getWordsByCategory(categoryName);

  if (!words || words.length < 1) {
    return res.sendStatus(404);
  }

  return res.json(words);
});

router.get('/:name', async (req, res) => {
  const wordName = req.params.name.toString();
  if (!wordName) {
    return res.sendStatus(400);
  }

  const word = await getWord(wordName);

  if (!word) {
    return res.sendStatus(404);
  }

  return res.json(word);
});

router.delete('/:name', async (req, res) => {
  const wordName = req.params.name.toString();

  if (!wordName) {
    return res.sendStatus(400);
  }

  try {
    await deleteWord(wordName);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.post('/', async (req, res) => {
  const word: Word = req.body;

  const category = await getCategory(word.category);

  if (!category) {
    return res.status(400).send(`Category '${word.category}' is not exist`);
  }

  try {
    await createWord(word);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.put('/', async (req, res) => {
  const word: Word = req.body;

  const category = await getCategory(word.category);

  if (!category) {
    return res.status(400).send(`Category '${word.category}' is not exist`);
  }

  try {
    await updateWord(word);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(400).send(e);
  }
});

export default router;
