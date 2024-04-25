import { Metadata } from 'next';

import LoginForm from '../_components/LoginForm';
import BasicContainer from '../_components/BasicContainer';
import Title from '../_components/Title';

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
