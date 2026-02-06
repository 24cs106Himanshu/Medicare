import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('lastLoggedInUser');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      localStorage.removeItem('lastLoggedInUser');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.verifyToken();
          dispatch({ type: 'SET_USER', payload: response.data.user });
        } catch (error) {
          dispatch({ type: 'AUTH_ERROR' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.login(credentials);
      
      // Store the logged-in user for mock API
      localStorage.setItem('lastLoggedInUser', JSON.stringify(response.data.user));
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });
      return response.data;
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.register(userData);
      
      // Store the registered user for mock API
      localStorage.setItem('lastLoggedInUser', JSON.stringify(response.data.user));
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });
      return response.data;
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('lastLoggedInUser');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};