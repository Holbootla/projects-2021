import { Word } from './word';

const words: Word[] = [
  {
    category: 'Action',
    word: 'cry',
    translation: 'плакать',
    image: 'images/cry.jpg',
  },
  {
    category: 'Action',
    word: 'dance',
    translation: 'танцевать',
    image: 'images/dance.jpg',
  },
  {
    category: 'Action',
    word: 'dive',
    translation: 'нырять',
    image: 'images/dive.jpg',
  },
  {
    category: 'Action',
    word: 'draw',
    translation: 'рисовать',
    image: 'images/draw.jpg',
  },
  {
    category: 'Action',
    word: 'fish',
    translation: 'ловить рыбу',
    image: 'images/fish.jpg',
  },
  {
    category: 'Action',
    word: 'fly',
    translation: 'летать',
    image: 'images/fly.jpg',
  },
  {
    category: 'Action',
    word: 'hug',
    translation: 'обнимать',
    image: 'images/hug.jpg',
  },
  {
    category: 'Action',
    word: 'jump',
    translation: 'прыгать',
    image: 'images/jump.jpg',
  },
];

export function getWords(): Promise<Word[]> {
  return Promise.resolve(words);
}

export function getWordsByCategory(name: string): Promise<Word[]> {
  const wordsOfCategory = words.filter(
    (el) => el.category.toLowerCase() === name.toLowerCase()
  );
  return Promise.resolve(wordsOfCategory);
}

export function getWord(name: string): Promise<Word | undefined> {
  const word = words.find((el) => el.word.toLowerCase() === name.toLowerCase());
  return Promise.resolve(word);
}

export function deleteWord(name: string): Promise<void> {
  const wordIndex = words.findIndex(
    (el) => el.word.toLowerCase() === name.toLowerCase()
  );

  if (wordIndex < 0) {
    Promise.reject(new Error('Word not found.'));
  }

  words.splice(wordIndex, 1);

  return Promise.resolve();
}

export function createWord(word: Word): Promise<Word> {
  if (words.find((el) => el.word === word.word)) {
    return Promise.reject(
      new Error(`This word '${word.word}' is already exist`)
    );
  }

  words.push(word);

  return Promise.resolve(word);
}

export function updateWord(word: Word): Promise<Word> {
  const wordIndex = words.findIndex(
    (el) => el.word.toLowerCase() === word.word.toLowerCase()
  );

  words.splice(wordIndex, 1);
  words.push(word);

  return Promise.resolve(word);
}
