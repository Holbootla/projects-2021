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

export function deleteCategory(name: string): Promise<void> {
  const categoryIndex = categories.findIndex(
    (el) => el.category.toLowerCase() === name.toLowerCase()
  );

  if (categoryIndex < 0) {
    Promise.reject(new Error('Category not found.'));
  }

  categories.splice(categoryIndex, 1);

  return Promise.resolve();
}

export function createCategory(category: Category): Promise<Category> {
  if (categories.find((el) => el.category === category.category)) {
    return Promise.reject(
      new Error(`This category '${category.category}' is already exist`)
    );
  }

  categories.push(category);

  return Promise.resolve(category);
}
