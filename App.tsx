import { Provider } from 'react-redux';
import { store} from './src/store/store';
import React   from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import AppNavigation from './src/navigation/app_routes';
enableScreens(); 

function AppContent() {


  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <Provider store={store} >
      <AppContent />
    </Provider>
  );
}
