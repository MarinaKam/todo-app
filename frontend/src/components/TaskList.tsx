import { ChangeEvent, FC, useState } from 'react';
import { Grid, Card, CardHeader, IconButton, Stack, Box, Typography, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { ITask } from '../models';
import { FormContent } from './FormContent';

interface ITaskList {
  tasks: ITask[];
  onUpdate: (id: string, value: { title: string; description: string; completed?: boolean }) => void;
  onDelete: (id: string) => void;
}

export const TaskList: FC<ITaskList> = ({ tasks: tasksList, onUpdate, onDelete }) => {
  const [editableId, setEditableId] = useState<null | string>(null);
  const [tasks, setTasks] = useState<ITask[]>(tasksList);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  console.log('tasks', tasks)
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  };

  const handleSubmit = (id: string) => {
    setDescription('');
    setTitle('');
    onUpdate(id, { title, description });
    setTasks((prevTasks) => (
      prevTasks?.map((task) => task?._id === id ? { ...task, title, description } : task)
    ));
    setEditableId(null);
  };

  const handleComplete = (taskVal: ITask) => {
    onUpdate(taskVal._id, {
      title: taskVal.title,
      description: taskVal.description,
      completed: !taskVal.completed
    });
    setTasks((prevTasks) => (
      prevTasks?.map((task) => task?._id === taskVal._id ? { ...task, completed: !task.completed } : task)
    ));
  };

  const handleDelete = (id: string) => () => {
    onDelete(id);
    setTasks((prevTasks) => prevTasks?.filter((task) => task?._id !== id));
  }

  const handleToggleEdit = (task?: ITask) => () => {
    setEditableId(task?._id || null);

    if (task) {
      setDescription(task?.description);
      setTitle(task?.title);
    }
  };

  return !tasks?.length ? (
    <Box display="flex" justifyContent="center" py={5}>
      <Typography variant="h5">Not Found</Typography>
    </Box>
    ) : (
    <Grid container spacing={[2, 3]} alignItems="stretch" sx={{ pt: 3 }}>
      {tasks?.map((task) => (
        <Grid key={task?._id} item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ minHeight: 300 }}>
          <Card sx={{ height: '100% '}}>
            <CardHeader
              avatar={
                <IconButton
                  size="small"
                  aria-label="complete"
                  title={task.completed ? 'Clear Complete' : 'Complete'}
                  color={!task.completed ? 'warning' : 'success'}
                  onClick={() => handleComplete(task)}
                >
                  {!task.completed ? <RemoveDoneIcon /> : <CheckIcon />}
                </IconButton>
              }
              action={
                <Stack flexDirection="row" gap={0.25}>
                  <IconButton
                    disabled={!!editableId}
                    size="small"
                    aria-label="update"
                    color="primary"
                    onClick={handleToggleEdit(task)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    disabled={!!editableId} size="small"
                    aria-label="delete"
                    color="error"
                    onClick={handleDelete(task._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              }
            />

            {editableId && editableId === task?._id ? (
              <CardContent component={Stack} sx={{ width: '100%' }} gap={1}>
                <FormContent
                  title={title}
                  description={description}
                  onChangeTitle={handleTitleChange}
                  onChangeDescription={handleDescriptionChange}
                  onSubmit={() => handleSubmit(task?._id)}
                  onCancel={handleToggleEdit()}
                />
              </CardContent>
            ) : (
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {task.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
