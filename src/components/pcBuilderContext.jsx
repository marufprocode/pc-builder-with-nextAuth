import React, { createContext, useReducer, useContext } from 'react';

// Define action types for the reducer
const ADD_COMPONENT = 'ADD_COMPONENT';
const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
const COMPLETE_BUILD = 'COMPLETE_BUILD'; 

// The reducer function to handle state updates
const reducer = (state, action) => {
  switch (action.type) {
    case ADD_COMPONENT:
      return [...state, action.payload.component];
    case REMOVE_COMPONENT:
      return state.filter((component) => component?._id !== action?.payload?.productId);
    case COMPLETE_BUILD:
      return []
    default:
      return state;
  }
};



const initialState = [];

const PCBuilderContext = createContext();

const PCBuilderProvider = ({ children }) => {
  const [selectedComponents, dispatch] = useReducer(reducer, initialState);

  const addComponent = (component) => {
    dispatch({
      type: ADD_COMPONENT,
      payload: { component },
    });
  };

  const removeComponent = (productId) => {
    dispatch({
      type: REMOVE_COMPONENT,
      payload: { productId },
    });
  };
  const completeBuild = () => {
    dispatch({
      type: COMPLETE_BUILD,
    });
  };


  return (
    <PCBuilderContext.Provider value={{ selectedComponents, addComponent, removeComponent, completeBuild }}>
      {children}
    </PCBuilderContext.Provider>
  );
};

export { PCBuilderContext, PCBuilderProvider };
