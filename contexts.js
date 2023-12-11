import React, { createContext,useContext } from 'react';

const GlobalContext = createContext('');

// export const ServerIPContext = createContext('');

export const ServerIPContextProvider = ({ value }) => {
    const [globalVariable, setGlobalVariable] = useState('');

    return (
        <GlobalContext.Provider value={{ value }}>
        </GlobalContext.Provider>
    );
};

export const useServerIPContext = () => {
    return useContext(GlobalContext);
};
