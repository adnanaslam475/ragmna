import React from "react";

const Store = React.createContext();
Store.displayName = "Store";
export const authData = JSON.parse(localStorage.getItem("user"));
export const lang = localStorage.getItem("lang");

export const initialState = {
  data: [],
  lang: lang || 'en-US',
  dir: lang === 'en-US' ? 'rtl' : 'ltr',
  openLoginmodal: false,
  user: authData
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      JSON.stringify(localStorage.setItem("user", action.payload));
      return { ...state, user: action.payload };
    case "LANG":
      localStorage.setItem('lang', action.payload)
      return {
        ...state,
        lang: action.payload,
        dir: action.payload == 'en-US' ? 'ltr' : 'rtl'
      };
    case "OPEN_AUTH_MODAL":
      return { ...state, openLoginmodal: action.payload };
    default:
      return state;
  }
};


export const useAuthStore = () => React.useContext(Store);
export const Provider = ({ children, initialState, reducer }) => {
  const [globalState, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={[globalState, dispatch]}>{children}</Store.Provider>
  );
};
