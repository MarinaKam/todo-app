import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import { ITask } from '../models';
import { TaskList } from './TaskList';
import { Form } from './Form';

export const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchTasks = () => {
    setIsLoaded(false);
    getTasks().then(setTasks).finally(() => setIsLoaded(true));
  };

  const handleCreateTask = (value: { title: string; description: string; }) => {
    createTask(value).then(fetchTasks);
  };

  const handleUpdateTask = (id: string, value: { title: string; description: string; completed?: boolean }) => {
    return updateTask(id, value);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id).then(fetchTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, height: '100%' }} p={5}>
      <Typography variant="h4" align="center" color="textSecondary">TODO List</Typography>

      <Form onCreate={handleCreateTask} />

      {!isLoaded ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50%'
          }}
        >
          <CircularProgress />
        </Box>
      ) : <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />}
    </Box>
  );
};
