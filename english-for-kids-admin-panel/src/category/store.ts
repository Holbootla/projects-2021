import { Category } from './category';

const categories: Category[] = [
  {
    category: 'Action',
    image: 'images/category/action.jpg',
  },
  {
    category: 'Animals',
    image: 'images/category/animals.jpg',
  },
  {
    category: 'Clothes',
    image: 'images/category/clothes.jpg',
  },
  {
    category: 'Emotions',
    image: 'images/category/emotions.jpg',
  },
  {
    category: 'Food',
    image: 'images/category/food.jpg',
  },
  {
    category: 'Family',
    image: 'images/category/family.jpg',
  },
  {
    category: 'Transport',
    image: 'images/category/transport.jpg',
  },
  {
    category: 'Sports',
    image: 'images/category/sports.jpg',
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

export function updateCategory(category: Category): Promise<Category> {
  const categoryIndex = categories.findIndex(
    (el) => el.category.toLowerCase() === category.category.toLowerCase()
  );

  categories.splice(categoryIndex, 1);
  categories.push(category);

  return Promise.resolve(category);
}
