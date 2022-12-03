import { v4 as uuid } from 'uuid';

export type Reminder = {
  id: string;
  description: string;
  completed: boolean;
};

export const reminders: Reminder[] = [
  {
    id: uuid(),
    description: 'Learn TypeScript',
    completed: false,
  },
  {
    id: uuid(),
    description: 'Feed my dog',
    completed: false,
  },
  {
    id: uuid(),
    description: 'Read a book',
    completed: false,
  },
];
