import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
// import { setupServer } from 'msw/node';

import App from './app';
import { server } from './mocks/server';

describe('App', () => {
  test('display initial reminders', async () => {
    render(<App />);

    expect(screen.getByText('No completed reminders yet.')).toBeInTheDocument();
    expect(await screen.findByText('Buy milk')).toBeInTheDocument();
    expect(await screen.findByText('Buy eggs')).toBeInTheDocument();
    expect(await screen.findByText('Learn RTL')).toBeInTheDocument();
  });

  test('add new reminder', async () => {
    await act(async () => render(<App />));

    const button = screen.getByRole('button', { name: 'Add' });
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'Buy bread');
    await userEvent.click(button);

    expect(await screen.findByText('Buy bread')).toBeInTheDocument();
  });

  test('complete a reminder', async () => {
    render(<App />);

    const openReminders = screen.getByTestId('open-reminders');
    // Use `within` to avoid querying the entire document
    const checkbox = await within(openReminders).findByRole('checkbox', {
      name: 'Buy milk',
    });

    // Complete reminder moves it to the completed reminders list
    await userEvent.click(checkbox);

    // The completed reminder is no longer in the open reminders list
    // Waiting for disappearance: https://testing-library.com/docs/guide-disappearance#waiting-for-disappearance
    await waitFor(() => {
      expect(
        within(openReminders).queryByText('Buy milk')
      ).not.toBeInTheDocument();
    });

    // The completed reminder is now in the completed reminders list
    const completedReminders = screen.getByTestId('completed-reminders');
    expect(
      within(completedReminders).getByText('Buy milk')
    ).toBeInTheDocument();
  });

  test('uncomplete a reminder', async () => {
    render(<App />);

    const completedReminders = screen.getByTestId('completed-reminders');
    const checkbox = await within(completedReminders).findByRole('checkbox', {
      name: 'Learn RTL',
    });

    // Uncomplete reminder moves it to the open reminders list
    await userEvent.click(checkbox);

    // The uncompleted reminder is no longer in the completed reminders list
    await waitFor(() => {
      expect(
        within(completedReminders).queryByText('Learn RTL')
      ).not.toBeInTheDocument();
    });

    // The uncompleted reminder is now in the open reminders list
    const openReminders = screen.getByTestId('open-reminders');
    expect(within(openReminders).getByText('Learn RTL')).toBeInTheDocument();
  });

  test('network error', async () => {
    // Override the default handler to return a 500 error
    server.use(
      rest.get('http://localhost:3131/open', (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<App />);
    expect(await screen.findByText('Server not ready.')).toBeInTheDocument();

    server.resetHandlers();
    server.close();
  });
});
