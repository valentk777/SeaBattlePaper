import React from 'react';
import AppContent from './src/AppContent';
import { AuthProvider } from './src/hooks/useAuth';
// import { TranslationProvider } from './src/hooks/useTranslations';
import { ThemeProvider } from './src/hooks/useTheme';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        {/* <TranslationProvider> */}
          <AppContent />
        {/* </TranslationProvider> */}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
