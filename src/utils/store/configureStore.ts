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
import surveyStatusMiddleware from '../../features/SurveyExecution/surveyStatusMiddleware';
import {languagesReducer} from '../../features/ContentLanguageSwitching/languagesReducer';
import {fileLoading} from '../../features/FileLoading/fileLoadingReducer';
import uploadingFileMiddleware from '../../features/FileLoading/uploadingFileMiddleware';
import downloadFilesMiddleware from '../../features/FileLoading/downlodFilesMiddleware';
import {searchInputReducer} from '../../components/Filters/searchInputReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [tokenReducer.name, surveyApi.reducerPath],
};

const rootReducer = combineReducers({
  [evaluationReducer.name]: evaluationReducer.reducer,
  [fileLoading.name]: fileLoading.reducer,
  [filtersReducer.name]: filtersReducer.reducer,
  [surveysReducer.name]: surveysReducer.reducer,
  [languagesReducer.name]: languagesReducer.reducer,
  [authReducer.name]: authReducer.reducer,
  [tokenReducer.name]: tokenReducer.reducer,
  [surveyApi.reducerPath]: surveyApi.reducer,
  [searchInputReducer.name]: searchInputReducer.reducer,
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
      surveyStatusMiddleware,
      uploadingFileMiddleware,
      downloadFilesMiddleware,
    );
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;
