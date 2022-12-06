import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import type { Reminder } from '../app';

let reminders: Reminder[] = [
  {
    id: uuid(),
    description: 'Buy milk',
    completed: false,
  },
  {
    id: uuid(),
    description: 'Buy eggs',
    completed: false,
  },
  {
    id: uuid(),
    description: 'Learn RTL',
    completed: true,
  },
];

export const handlers = [
  rest.get('http://localhost:3131/open', (_, res, ctx) => {
    return res(
      ctx.json({
        data: reminders.filter(reminder => !reminder.completed),
      })
    );
  }),

  rest.get('http://localhost:3131/completed', (_, res, ctx) => {
    return res(
      ctx.json({
        data: reminders.filter(reminder => reminder.completed),
      })
    );
  }),

  rest.post('http://localhost:3131/', async (req, res, ctx) => {
    const json: Reminder = await req.json();
    reminders = [
      ...reminders,
      { id: uuid(), description: json.description, completed: false },
    ];
    return res(
      ctx.json({
        data: reminders.filter(reminder => !reminder.completed),
      })
    );
  }),

  rest.put('http://localhost:3131/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const json: Reminder = await req.json();
    const reminder = reminders.find(reminder => reminder.id === id);

    if (reminder) {
      reminder.completed = json.completed;
    }

    return res(
      ctx.json({
        data: reminders.filter(reminder => !reminder.completed),
      })
    );
  }),
];
