import React from 'react';
import {AuthContext} from './context/AuthContext';
import {useAuthContext} from './features/Auth/hooks/useAuthContext';
import {Provider} from 'react-redux';
import {persistor, store} from './utils/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import NavigationRoot from './NavigationRoot';
import {Portal} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const authContext = useAuthContext();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AuthContext.Provider value={authContext}>
          <Portal.Host>
            <SafeAreaProvider>
              <NavigationRoot />
            </SafeAreaProvider>
          </Portal.Host>
        </AuthContext.Provider>
      </PersistGate>
    </Provider>
  );
};

export default App;
