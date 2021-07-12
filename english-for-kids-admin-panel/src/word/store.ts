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
