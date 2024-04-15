import { Metadata } from 'next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoginForm from '../components/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <Box width={600} padding={3} margin="0 auto">
      <Typography variant="h3" gutterBottom>
        Log In
      </Typography>
      <LoginForm />
    </Box>
  );
}
