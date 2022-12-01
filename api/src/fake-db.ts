import { v4 as uuid } from 'uuid';

export type Todo = {
  id: string;
  title: string;
};

export const todos: Todo[] = [
  {
    id: uuid(),
    title: 'Learn react testing library',
  },
  {
    id: uuid(),
    title: 'Feed my dog',
  },
  {
    id: uuid(),
    title: 'Read a book',
  },
];
