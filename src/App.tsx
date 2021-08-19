import React from 'react';
import {AuthContext} from './context/AuthContext';
import {useAuthContext} from './features/Auth/hooks/useAuthContext';
import {Provider} from 'react-redux';
import {persistor, store} from './utils/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import NavigationRoot from './NavigationRoot';

const App = () => {
  const authContext = useAuthContext();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null} />
      <AuthContext.Provider value={authContext}>
        <NavigationRoot />
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
