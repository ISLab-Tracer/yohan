// commonDataContext.js

import { createContext, useReducer, useEffect, useContext } from 'react';
import { CommonAPI } from 'API';
import { getSession } from 'Utils';

const CommonDataContext = createContext();

const initialState = {
  categoryList: null,
  projectList: null,
  userList: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return { ...state, ...action.payload };
    case 'FETCH_DATA_FAILURE':
      return { ...state };
    default:
      return state;
  }
};

export const useCommonData = () => {
  const context = useContext(CommonDataContext);
  if (!context) {
    throw new Error('Cannot find SessionContext');
  }
  return context;
};

const CommonDataManager = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      return;
    }
    const fetchData = async () => {
      try {
        const result = await CommonAPI.getCommonData();

        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: result });
      } catch (error) {
        console.log(error);
        // dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <CommonDataContext.Provider value={state}>
      {children}
    </CommonDataContext.Provider>
  );
};

export default CommonDataManager;
