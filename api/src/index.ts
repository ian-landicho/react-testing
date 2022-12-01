import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';

import { Todo, todos } from './fake-db';

const port = 3131;
const app = express();

app.use(cors());

app.get('/', (_, res: express.Response) => {
  return res.json({ data: todos });
});

app.get('/:title', (req: express.Request, res: express.Response) => {
  const { title } = req.params;
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(title.toLowerCase())
  );

  return res.json({ data: filteredTodos });
});

app.post('/', (req: express.Request, res: express.Response) => {
  const { title } = req.body;
  const newTodo: Todo = {
    id: uuid(),
    title,
  };
  todos.push(newTodo);

  return res.json({ data: todos });
});

app.delete('/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const index = todos.findIndex(todo => todo.id === id);
  todos.splice(index, 1);

  return res.json({ data: todos });
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
