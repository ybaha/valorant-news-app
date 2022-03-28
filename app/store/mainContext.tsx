import { View, Text } from "native-base";
import React, { createContext } from "react";

type MainContextProps = {
  showModal: boolean;
  setShowModal: (e: any) => void;
};

export const mainContext = createContext<MainContextProps>(
  {} as MainContextProps
);

export const useMainContextStore = () => {
  return React.useContext(mainContext);
};

const MainContextProvider: React.FC = ({ children }) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <mainContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </mainContext.Provider>
  );
};

export default MainContextProvider;
