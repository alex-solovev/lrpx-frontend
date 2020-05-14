import rootReducer from './rootReducer';
import store from './index';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
