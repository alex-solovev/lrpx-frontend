import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from 'router/AppRouter';
import store from 'store';
import DefaultTheme from 'theme/default.theme';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <DefaultTheme />
      <AppRouter />
    </Provider>
  );
}

export default App;
