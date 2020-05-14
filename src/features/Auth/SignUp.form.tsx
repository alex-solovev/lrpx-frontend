import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { TextInput } from 'components/lib/TextInput';
import { Button } from 'components/lib/Button';
import useAppSelector from 'hooks/useAppSelector';
import { signUp } from './actions';

Yup.addMethod<Yup.StringSchema>(Yup.string, 'equalTo', function equalTo(ref, msg) {
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message: msg || 'Password does not match',
    params: {
      reference: ref.path,
    },
    test(value) {
      return value === this.resolve(ref);
    },
  });
});

const SignUpFormValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8, 'Password is too short').required(),
  // eslint-disable-next-line
  // @ts-ignore
  passwordConfirmation: Yup.string().equalTo(Yup.ref('password')),
});

const emailKey = 'email';
const passwordKey = 'password';
const passwordConfirmationKey = 'passwordConfirmation';

const SignUpForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { error, loading } = useAppSelector((state) => state.app);
  const formik = useFormik({
    validationSchema: SignUpFormValidationSchema,
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: ({ passwordConfirmation, ...values }) => {
      dispatch(signUp(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Sing Up</h2>
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
      <br />

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

      <label htmlFor={passwordConfirmationKey}>
        Confirm password
        <br />
        <TextInput
          id={passwordConfirmationKey}
          name={passwordConfirmationKey}
          type="password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
        />
        <br />
      </label>
      <div>
        {formik.touched && formik.errors.passwordConfirmation
          ? formik.errors.passwordConfirmation
          : ''}
      </div>
      <br />

      <Button type="submit" disabled={loading}>
        Submit
      </Button>
      <Link to="/login">Log In</Link>
    </form>
  );
};

export default SignUpForm;
