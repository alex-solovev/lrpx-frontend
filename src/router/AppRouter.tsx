import * as React from 'react';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import LogInForm from 'features/Auth/LogIn.form';
import SignUpForm from 'features/Auth/SignUp.form';
import useAppSelector from 'hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { appActions, selectIsAutenticated, selectAppLoading } from 'app/state';
import DashboardPlaceholder from 'features/Dashboard/DashboardPlaceholder';

const AppRouter: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(selectIsAutenticated);
  const loading = useAppSelector(selectAppLoading);

  const authenticatedRoutes = (
    <Switch>
      <Route exact path="/dashboard" component={DashboardPlaceholder} />
      <Redirect to="/dashboard" />
    </Switch>
  );
  const unauthenticatedRoutes = (
    <Switch>
      <Route exact path="/signup" component={SignUpForm} />
      <Route exact path="/login" component={LogInForm} />
      <Redirect to="/login" />
    </Switch>
  );

  useEffect(() => {
    dispatch(appActions.fetchCurrentUserStart());
  }, [dispatch]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <HashRouter>{isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}</HashRouter>;
};

export default AppRouter;
