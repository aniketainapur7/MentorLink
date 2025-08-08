import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string | undefined;
  avatar?: string;
  bio?: string;
  subjects?: string[];
  rating?: number;
  hourlyRate?: number;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  notifications: number;
  quickConnectAvailable: boolean;
  loading: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_NOTIFICATIONS'; payload: number }
  | { type: 'TOGGLE_QUICK_CONNECT' };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  theme: 'light',
  notifications: 0,
  quickConnectAvailable: true,
  loading: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };
    case 'TOGGLE_QUICK_CONNECT':
      return {
        ...state,
        quickConnectAvailable: !state.quickConnectAvailable,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedTheme = localStorage.getItem('mentorlink-theme') as 'light' | 'dark';
    if (savedTheme && savedTheme !== state.theme) {
      dispatch({ type: 'TOGGLE_THEME' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mentorlink-theme', state.theme);
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}