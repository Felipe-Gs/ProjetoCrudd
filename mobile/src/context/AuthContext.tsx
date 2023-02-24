import React, { createContext, useState } from "react";
import api from "../axios/api";
export const AuthContext = createContext({});
interface ILoginResponse {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  profissao: string;
  idade: number;
}

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usuario, setUsuario] = useState([]);
  const [erro, setErro] = useState<string>("");
  const handleLogin = async (email: string, senha: string) => {
    if (email === "" || senha === "") {
      setErro("insira os valores primeiro!");
      return;
    }
    try {
      const response: any = await api.post("/login", {
        email,
        senha,
      });
      setErro(response.message);
      setUsuario(response.data.usuario);
      console.log(response.data.usuario);
      console.log(usuario);
    } catch (error: any) {
      setErro(error.message);
    }
  };

  const handleDados = async () => {
    try {
      const response = await api.get("/buscarUsuarios");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        usuario,
        erro,
        handleDados,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
