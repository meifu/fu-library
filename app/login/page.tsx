import { Metadata } from 'next';

import Typography from '@mui/material/Typography';
import LoginForm from '../components/LoginForm';
import BasicContainer from '../components/BasicContainer';
import Title from '../components/Title';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <BasicContainer>
      <Title text="Log In" />
      <LoginForm />
    </BasicContainer>
  );
}
