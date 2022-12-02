import { v4 as uuid } from 'uuid';

export type Reminder = {
  id: string;
  description: string;
  isCompleted: boolean;
};

export const reminders: Reminder[] = [
  {
    id: uuid(),
    description: 'Learn TypeScript',
    isCompleted: false,
  },
  {
    id: uuid(),
    description: 'Feed my dog',
    isCompleted: false,
  },
  {
    id: uuid(),
    description: 'Read a book',
    isCompleted: false,
  },
];
