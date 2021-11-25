import React, { createContext, useContext, useState } from 'react';

import { AuthData, authService } from '../services/authService';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   //Every time the App is opened, this provider is rendered
  //   //and call de loadStorage function.
  //   loadStorageData();
  // }, []);
  //
  // async function loadStorageData(): Promise<void> {
  //   try {
  //     //Try get the data from Async Storage
  //     const authDataSerialized = await AsyncStorage.getItem('@AuthData');
  //     if (authDataSerialized) {
  //       //If there are data, it's converted to an Object and the state is updated.
  //       const _authData: AuthData = JSON.parse(authDataSerialized);
  //       setAuthData(_authData);
  //     }
  //   } catch (error) {
  //   } finally {
  //     //loading finished
  //     setLoading(false);
  //   }
  // }

  const signIn = async (username: string, password: string) => {
    setLoading(true);

    const _authData = await authService.signIn(username, password);

    setAuthData(_authData);
    setLoading(false);
    // AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
  };

  const signOut = async () => {
    await authService.signOut();
    setAuthData(undefined);
    // await AsyncStorage.removeItem('@AuthData');
  };

  return (
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext, AuthProvider, useAuth };
