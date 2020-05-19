import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { TextInput } from 'components/lib/TextInput';
import { Text } from 'components/lib/Text';
import { Button } from 'components/lib/Button';
import FormGroup from 'components/FormGroup';
import { Grid } from 'components/lib/Grid';
import { Form } from 'components/lib/Form';
import useAppSelector from 'hooks/useAppSelector';
import { logIn } from './actions';

const LoginFormValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8, 'Password is too short').required(),
});

const emailKey = 'email';
const passwordKey = 'password';

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { error, loading } = useAppSelector((state) => state.app);
  const formik = useFormik({
    initialValues: {
      email: 'test@test.com',
      password: '12345678',
    },
    onSubmit: (values) => {
      dispatch(logIn(values));
    },
    validationSchema: LoginFormValidationSchema,
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid gap="medium" width={300}>
        <Text tag="h2">Log In</Text>
        {!!error && (
          <Text tag="div" intent="error" padding="medium" border="medium" radius="small" filled>
            {error}
          </Text>
        )}
        <FormGroup
          label="Email Address"
          error={formik.touched && formik.errors.email ? formik.errors.email : ''}
        >
          <TextInput
            name={emailKey}
            type={emailKey}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </FormGroup>
        <FormGroup
          label="Password"
          error={formik.touched && formik.errors.password ? formik.errors.password : ''}
        >
          <TextInput
            name={passwordKey}
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </FormGroup>
        <div>
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </div>
        <Link to="/signup">Sign Up</Link>
      </Grid>
    </Form>
  );
};

export default LoginForm;
