import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { TextInput } from 'components/lib/TextInput';
import { Button } from 'components/lib/Button';
import useAppSelector from 'hooks/useAppSelector';
import { Form } from 'components/lib/Form';
import { Text } from 'components/lib/Text';
import { Grid } from 'components/lib/Grid';
import FormGroup from 'components/FormGroup';
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
    <Form onSubmit={formik.handleSubmit}>
      <Grid gap="medium" width={300}>
        <Text tag="h2">Sing Up</Text>
        {!!error && (
          <Text tag="div" intent="error" padding="medium" border="medium" radius="small" filled>
            {error}
          </Text>
        )}
        <FormGroup
          label="Email"
          error={formik.touched && formik.errors.email ? formik.errors.email : ''}
        >
          <TextInput
            id={emailKey}
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
            id={passwordKey}
            name={passwordKey}
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </FormGroup>

        <FormGroup
          label="Confirm password"
          error={
            formik.touched && formik.errors.passwordConfirmation
              ? formik.errors.passwordConfirmation
              : ''
          }
        >
          <TextInput
            id={passwordConfirmationKey}
            name={passwordConfirmationKey}
            type="password"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
          />
          <br />
        </FormGroup>
        <div>
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </div>
        <Link to="/login">Log In</Link>
      </Grid>
    </Form>
  );
};

export default SignUpForm;
