import * as React from 'react';
import { DarkTheme, Provider as PaperProvider } from 'react-native-paper';

import Main from './src/pages/main';


export default function App() {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  );
}

