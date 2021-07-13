import { User } from './user';

const users: User[] = [
  {
    username: 'admin',
    password: 'admin',
  },
];

export default function isUserExist(currentUser: User): Promise<boolean> {
  const isExist =
    users.findIndex(
      (el) =>
        el.username === currentUser.username &&
        el.password === currentUser.password
    ) !== -1;
  return Promise.resolve(isExist);
}
