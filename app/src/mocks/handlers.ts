import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3131/open', (_, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: '1',
            description: 'Buy milk',
            completed: false,
          },
          {
            id: '2',
            description: 'Buy eggs',
            completed: false,
          },
        ],
      })
    );
  }),

  rest.get('http://localhost:3131/completed', (_, res, ctx) => {
    return res(
      ctx.json({
        data: [],
      })
    );
  }),
];
