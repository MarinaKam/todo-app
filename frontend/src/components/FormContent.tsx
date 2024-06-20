import { Button, TextField , Box } from '@mui/material';
import { ChangeEvent, FC } from 'react';

interface IFormContent {
  title: string;
  description: string;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel?: () => void;
}

export const FormContent: FC<IFormContent> = ({
  title,
  description,
  onChangeTitle,
  onChangeDescription,
  onSubmit,
  onCancel
}) => {
  return (
    <>
      <TextField
        required
        fullWidth
        label="Title"
        value={title || ''}
        variant="standard"
        onChange={onChangeTitle}
      />

      <TextField
        required
        fullWidth
        label="Description"
        value={description || ''}
        multiline
        rows={4}
        onChange={onChangeDescription}
      />

      <Box display="flex" justifyContent="space-between">
        {!!onCancel && (
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{ maxWidth: '48%' }}
          >
            Cancel
          </Button>
        )}

        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            maxWidth: !!onCancel ? '48%' : '100%',
            ...(!onCancel && { width: '100%' })
        }}
        >
          {!!onCancel ? 'Update' : 'Add Task'}
        </Button>
      </Box>
    </>
  );
};
