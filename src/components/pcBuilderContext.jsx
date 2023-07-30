import React, { createContext, useReducer } from 'react';

// Define action types for the reducer
const ADD_COMPONENT = 'ADD_COMPONENT';
const REMOVE_COMPONENT = 'REMOVE_COMPONENT';

// The reducer function to handle state updates
const reducer = (state, action) => {
  switch (action.type) {
    case ADD_COMPONENT:
      return {
        ...state,
        [action.payload.category]: [
          ...(state[action.payload.category] || []),
          action.payload.component,
        ],
      };
    case REMOVE_COMPONENT:
      return {
        ...state,
        [action.payload.category]: state[action.payload.category].filter(
          (_, index) => index !== action.payload.componentIndex
        ),
      };
    default:
      return state;
  }
};

const initialState = {};

const PCBuilderContext = createContext();

const PCBuilderProvider = ({ children }) => {
  const [selectedComponents, dispatch] = useReducer(reducer, initialState);

  const addComponent = (category, component) => {
    dispatch({
      type: ADD_COMPONENT,
      payload: { category, component },
    });
  };

  const removeComponent = (category, componentIndex) => {
    dispatch({
      type: REMOVE_COMPONENT,
      payload: { category, componentIndex },
    });
  };

  return (
    <PCBuilderContext.Provider value={{ selectedComponents, addComponent, removeComponent }}>
      {children}
    </PCBuilderContext.Provider>
  );
};

export { PCBuilderContext, PCBuilderProvider };
