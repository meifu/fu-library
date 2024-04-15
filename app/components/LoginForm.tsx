'use client';

import { FormikProvider, useField, useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { signIn } from 'next-auth/react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { LoginField } from '@/lib/action';

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
  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: async (values) => {
      console.log('onSubmit', values);
      const res = await signIn('google');
      console.log('test', res);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} direction="column">
          <LoginField label="Email" name="email" />
          <LoginField label="Password" name="password" type="password" />
          <Button variant="contained" type="submit">
            Log in
          </Button>
        </Stack>
      </form>
    </FormikProvider>
  );
}
