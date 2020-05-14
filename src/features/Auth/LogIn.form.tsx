import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { TextInput } from 'components/lib/TextInput';
import { Button } from 'components/lib/Button';
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
    <form onSubmit={formik.handleSubmit}>
      <h2>Log In</h2>
      {error && <div>{error}</div>}
      <label htmlFor={emailKey}>
        Email Address
        <br />
        <TextInput
          id={emailKey}
          name={emailKey}
          type={emailKey}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <br />
      </label>
      <div>{formik.touched && formik.errors.email ? formik.errors.email : ''}</div>
      <label htmlFor={passwordKey}>
        Password
        <br />
        <TextInput
          id={passwordKey}
          name={passwordKey}
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <br />
      </label>
      <div>{formik.touched && formik.errors.password ? formik.errors.password : ''}</div>
      <br />
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
      <Link to="/signup">Sign Up</Link>
    </form>
  );
};

export default LoginForm;
