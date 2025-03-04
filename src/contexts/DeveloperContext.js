import React, { createContext, useContext, useState, useEffect } from "react";

const DeveloperContext = createContext();

export const DeveloperProvider = ({ children }) => {
    const [developerId, setDeveloperId] = useState(null);

    useEffect(() => {
        if (developerId) {
            setDeveloperId(developerId);
        }
    }, [developerId]);

    return (
        <DeveloperContext.Provider value={{ developerId, setDeveloperId }}>
            {children}
        </DeveloperContext.Provider>
    );
};

export const useDeveloper = () => {
    const context = useContext(DeveloperContext);
    if (!context) {
        throw new Error("useDeveloper must be used within a DeveloperProvider");
    }
    return context;
};
