import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {surveyApi} from '../../features/Survey/surveyService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import {
  useDispatch as useDispatchRedux,
  TypedUseSelectorHook,
  useSelector as useSelectorRedux,
} from 'react-redux';
import {authReducer} from '../../features/Auth/authReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [surveyApi.reducerPath],
};

const rootReducer = combineReducers({
  [authReducer.name]: authReducer.reducer,
  [surveyApi.reducerPath]: surveyApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(surveyApi.middleware);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
