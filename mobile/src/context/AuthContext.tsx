import React, { createContext, useState, useEffect, Children } from "react";
export const AuthContext = createContext({});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
