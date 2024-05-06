'use client';

import { FormikProvider, useField, useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { LoginField } from '../../lib/definitions';

interface LoginFieldInterface {
  name: string;
  label: string;
  type?: string;
  [key: string]: any;
}

const LoginField = ({ name, label, type = 'text' }: LoginFieldInterface) => {
  const [field, meta] = useField(name);
  return (
    <TextField
      name={name}
      label={label}
      type={type}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      onChange={field.onChange}
      onBlur={field.onBlur}
    />
  );
};

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const defaultValue: LoginField = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const [isCredentialFailed, setIsCredentialFailed] = useState(false);
  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: async (values) => {
      const res = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      if (!res?.ok) {
        setIsCredentialFailed(true);
      } else {
        router.push('/');
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Stack spacing={2} direction="column">
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} direction="column" mt={1}>
            <LoginField label="Email" name="email" />
            <LoginField label="Password" name="password" type="password" />
            {isCredentialFailed && (
              <Typography mt={1} mb={1} color="error">
                Invalid sign in
              </Typography>
            )}
            <Button variant="contained" type="submit">
              Log in
            </Button>
          </Stack>
        </form>
        {/* <Typography variant="h6" textAlign="center">
          OR
        </Typography>
        <Button
          variant="outlined"
          onClick={async () => {
            try {
              await signIn('google', { callbackUrl: '/' });
            } catch (error) {
              console.error('what error', error);
            }
          }}
        >
          Log in with google account
        </Button> */}
      </Stack>
    </FormikProvider>
  );
}
