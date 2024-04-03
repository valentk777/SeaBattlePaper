import React, { ProviderProps, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AppTheme } from '../styles/themeModels';
import { lightBluePaperTheme } from '../styles/lightBluePaperTheme';
import { useCurrentUser } from './useCurrentUser';

interface ThemeMap {
  name: string;
  color: string;
  iconName: string;
  theme: AppTheme;
}

interface IThemeContext {
  theme: AppTheme;
  // getAllThemes: () => ThemeMap[];
  // setTheme: (theme: ThemeMap) => Promise<void>;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: {} as AppTheme, // default theme
  // getAllThemes: () => [] as ThemeMap[],
  // setTheme: (theme: ThemeMap) => { }
});

const themesMap = [
  { name: 'lightBlue', color: "#A1C0FF", iconName: "night-mode.png", theme: lightBluePaperTheme },
] as ThemeMap[];

interface ThemeContextProviderProps
  extends Omit<ProviderProps<ThemeContextProviderProps>, 'value'> {
}

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
  const user = useCurrentUser();
  const [currentTheme, setCurrentTheme] = useState(lightBluePaperTheme)

  useEffect(() => {
    const getCurrentThemeOrDefault = () => {

      if (user?.theme == null || user?.theme == undefined || !user.isOnline) {
        setCurrentTheme(lightBluePaperTheme);
        return;
      }

      const selected = themesMap.filter(x => x.name == user?.theme);

      if (selected.length == 0) {
        setCurrentTheme(lightBluePaperTheme);
        return;
      }

      setCurrentTheme(selected[0].theme);
    }

    getCurrentThemeOrDefault();
  }, [user]);

  // const getAllThemes = () => {
  //   return themesMap;
  // }

  // const setTheme = async (theme: ThemeMap) => {
  //   setCurrentTheme(theme.theme);
  //   await userService.updateUserTheme(theme.name);
  // }

  const values = useMemo(() => ({
    theme: currentTheme,
    //  getAllThemes,
    //   setTheme 
  }), [currentTheme]);

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
