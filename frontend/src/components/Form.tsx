import { ChangeEvent, FC, useState } from 'react';
import { Box, Stack, Paper } from '@mui/material';
import { FormContent } from './FormContent';

interface IForm {
  onCreate: (val: { title: string; description: string; }) => void;
}

export const Form: FC<IForm> = ({ onCreate }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  };

  const handleSubmit = () => {
    setDescription('');
    setTitle('');
    onCreate({ title, description });
  };

  return (
    <Box display="flex" justifyContent="center" pt={3}>
      <Paper component={Stack} sx={{ width: '100%', maxWidth: 500, p: 3 }} gap={3}>
        <FormContent
          title={title}
          description={description}
          onChangeTitle={handleTitleChange}
          onChangeDescription={handleDescriptionChange}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};
