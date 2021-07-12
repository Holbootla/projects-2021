import { Router } from 'express';
import { getWords, getWordsByCategory, getWord } from './store';

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

export default router;
