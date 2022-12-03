import * as React from 'react';
import {
  Alert,
  Button,
  Group,
  Header,
  MantineProvider,
  SimpleGrid,
  Stack,
  Switch,
  TextInput,
  Title,
} from '@mantine/core';

const API_URL = 'http://localhost:3131/';

type Reminder = {
  id: string;
  description: string;
  completed: boolean;
};

export default function App() {
  const [openReminders, setOpenReminders] = React.useState<Reminder[]>([]);
  const [completedReminders, setCompletedReminders] = React.useState<
    Reminder[]
  >([]);

  React.useEffect(() => {
    getReminders();

    async function getReminders() {
      const [open, completed] = await Promise.all([
        fetch(`${API_URL}open`),
        fetch(`${API_URL}completed`),
      ]);
      const [openData, completedData]: [
        openData: { data: Reminder[] },
        completeData: { data: Reminder[] }
      ] = await Promise.all([open.json(), completed.json()]);

      setOpenReminders(openData.data);
      setCompletedReminders(completedData.data);
    }
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Header height={64} mb={50} pt={10} pl={20}>
        <Title order={1} weight="lighter">
          Reminders
        </Title>
      </Header>
      <Stack align="center">
        <Stack spacing={50}>
          <Form setOpenReminders={setOpenReminders} />
          <Reminders
            openReminders={openReminders}
            completedReminders={completedReminders}
            setOpenReminders={setOpenReminders}
            setCompletedReminders={setCompletedReminders}
          />
        </Stack>
      </Stack>
    </MantineProvider>
  );
}

function Form({
  setOpenReminders,
}: {
  setOpenReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
}) {
  const [description, setDescription] = React.useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    if (response.ok) {
      const { data } = await response.json();
      setOpenReminders(data);
      setDescription('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Group>
        <TextInput
          placeholder="Description"
          size="xl"
          sx={{ width: '500px' }}
          value={description}
          onChange={event => setDescription(event.currentTarget.value)}
        />
        <Button type="submit" size="xl">
          Add
        </Button>
      </Group>
    </form>
  );
}

type RemindersProps = {
  readonly openReminders: Reminder[];
  readonly completedReminders: Reminder[];
  readonly setOpenReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
  readonly setCompletedReminders: React.Dispatch<
    React.SetStateAction<Reminder[]>
  >;
};

function Reminders({
  openReminders,
  completedReminders,
  setOpenReminders,
  setCompletedReminders,
}: RemindersProps) {
  function handleToggle(reminder: Readonly<Reminder>) {
    const updatedReminder = { ...reminder, completed: !reminder.completed };

    if (updatedReminder.completed) {
      const index = openReminders.findIndex(r => r.id === reminder.id);
      setOpenReminders(prev => [
        ...prev.slice(0, index),
        updatedReminder,
        ...prev.slice(index + 1),
      ]);
      setTimeout(async () => {
        setCompletedReminders(prev => [...prev, updatedReminder]);
        setOpenReminders(prev => prev.filter(r => r.id !== reminder.id));
        await updateReminder(updatedReminder);
      }, 500);
    } else {
      const index = completedReminders.findIndex(r => r.id === reminder.id);
      setCompletedReminders(prev => [
        ...prev.slice(0, index),
        updatedReminder,
        ...prev.slice(index + 1),
      ]);
      setTimeout(async () => {
        setOpenReminders(prev => [...prev, updatedReminder]);
        setCompletedReminders(prev => prev.filter(r => r.id !== reminder.id));
        await updateReminder(updatedReminder);
      }, 500);
    }
  }

  async function updateReminder(reminder: Readonly<Reminder>) {
    const response = await fetch(`${API_URL}${reminder.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: reminder }),
    });

    if (!response.ok) {
      console.error(
        `Error occured with the following status: ${response.statusText}`
      );
    }
  }

  return (
    <>
      <Stack>
        <Title order={2} weight="lighter">
          My Reminders
        </Title>
        <SimpleGrid cols={2}>
          {openReminders.length === 0 ? (
            <Alert>No reminders found.</Alert>
          ) : (
            openReminders.map(reminder => {
              return (
                <Switch
                  key={reminder.id}
                  label={reminder.description}
                  size="xl"
                  checked={reminder.completed}
                  onChange={() => handleToggle(reminder)}
                />
              );
            })
          )}
        </SimpleGrid>
      </Stack>
      <Stack>
        <Title order={2} weight="lighter">
          Completed
        </Title>
        <SimpleGrid cols={2}>
          {completedReminders.length === 0 ? (
            <Alert>No completed reminders yet.</Alert>
          ) : (
            completedReminders.map(reminder => {
              return (
                <Switch
                  key={reminder.id}
                  label={reminder.description}
                  size="xl"
                  checked={reminder.completed}
                  onChange={() => handleToggle(reminder)}
                />
              );
            })
          )}
        </SimpleGrid>
      </Stack>
    </>
  );
}
