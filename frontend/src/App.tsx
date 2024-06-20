import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Container, Paper } from '@mui/material';

import { Tasks } from './components';

function App() {
  return (
    <Container
      maxWidth={false}
      sx={{
        background: (theme) => theme.palette.grey[100],
        height: '100%',
        minHeight: '100vh'
      }}
    >
      <Tasks />
    </Container>
  );
}

export default App;
