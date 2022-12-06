import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuid } from 'uuid';

import { Reminder, reminders } from './fake-db';

const port = 3131;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (_, res: express.Response) => {
  return res.json({ data: reminders });
});

app.get('/open', (_, res: express.Response) => {
  return res.json({ data: reminders.filter(reminder => !reminder.completed) });
});

app.get('/completed', (_, res: express.Response) => {
  return res.json({ data: reminders.filter(reminder => reminder.completed) });
});

app.get('/:description', (req: express.Request, res: express.Response) => {
  const { description } = req.params;
  const filteredReminders = reminders.filter(reminder =>
    reminder.description.toLowerCase().includes(description.toLowerCase())
  );

  return res.json({ data: filteredReminders });
});

app.post('/', (req: express.Request, res: express.Response) => {
  const { description }: { description: Reminder['description'] } = req.body;
  const newReminder: Reminder = {
    id: uuid(),
    description,
    completed: false,
  };
  reminders.push(newReminder);

  return res.json({ data: reminders.filter(reminder => !reminder.completed) });
});

app.put('/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { payload }: { payload: Reminder } = req.body;
  const reminder = reminders.find(reminder => reminder.id === id);

  if (reminder) {
    reminder.completed = payload.completed;
  }

  return res.json({ data: reminders.filter(reminder => !reminder.completed) });
});

app.delete('/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const index = reminders.findIndex(reminder => reminder.id === id);
  reminders.splice(index, 1);

  return res.json({ data: reminders });
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
