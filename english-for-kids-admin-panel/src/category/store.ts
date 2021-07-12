import { Category } from './category';

const categories: Category[] = [
  {
    category: 'Action',
  },
  {
    category: 'Animals',
  },
  {
    category: 'Clothes',
  },
  {
    category: 'Emotions',
  },
  {
    category: 'Food',
  },
  {
    category: 'Family',
  },
  {
    category: 'Transport',
  },
  {
    category: 'Sports',
  },
];

export function getCategories(): Promise<Category[]> {
  return Promise.resolve(categories);
}

export function getCategory(name: string): Promise<Category | undefined> {
  const category = categories.find(
    (el) => el.category.toLowerCase() === name.toLowerCase()
  );
  return Promise.resolve(category);
}
