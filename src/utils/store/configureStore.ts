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
import {tokenReducer} from '../../features/Auth/tokenReducer';
import {filtersReducer} from '../../components/Filters/filtersReducer';
import {evaluationReducer} from '../../features/SurveyExecution/evaluationReducer';
import fillingMiddleware from '../../features/SurveyExecution/fillingMiddleware';
import {surveysReducer} from '../../features/Survey/surveysReducer';
import fillTimeStampMiddleware from '../../features/Survey/fillTimeStampMiddleware';
import standardStatusMiddleware from '../../features/SurveyExecution/standardStatusMiddleware';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [tokenReducer.name, surveyApi.reducerPath],
};

const rootReducer = combineReducers({
  [evaluationReducer.name]: evaluationReducer.reducer,
  [filtersReducer.name]: filtersReducer.reducer,
  [surveysReducer.name]: surveysReducer.reducer,
  [authReducer.name]: authReducer.reducer,
  [tokenReducer.name]: tokenReducer.reducer,
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
    }).concat(
      surveyApi.middleware,
      fillingMiddleware,
      fillTimeStampMiddleware,
      standardStatusMiddleware,
    );
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
