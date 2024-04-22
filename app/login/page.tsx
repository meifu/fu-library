import { Metadata } from 'next';

import Typography from '@mui/material/Typography';
import LoginForm from '../components/LoginForm';
import BasicContainer from '../components/BasicContainer';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <BasicContainer>
      <Typography variant="h3" gutterBottom>
        Log In
      </Typography>
      <LoginForm />
    </BasicContainer>
  );
}
