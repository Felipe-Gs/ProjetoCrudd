import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ParamListBase } from "@react-navigation/routers";

import useAuth from "../hooks/useAuth";
import api from "../axios/api";

interface Icadastro {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  profissao: string;
  idade: number;
}

const CriarUsuario = () => {
  const { navigate } = useNavigation<NavigationProp<ParamListBase>>();
  const [email, setemail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [profissao, setProfissao] = useState<string>("");
  const [idade, setIdade] = useState(0);
  const [user, setUser] = useState<Icadastro[]>([]);

  const [erro, setErro] = useState<string>("");
  const { handleLogin, usuario }: any = useAuth();
  //         nome: Z.string(),
  //   sobrenome: Z.string(),
  //   email: Z.string().email(),
  //   senha: Z.string().min(3),
  //   profissao: Z.string(),
  //   idade: Z.number(),

  const handleCadastro = async () => {
    try {
      const response = await api.post("/addUsuario", {
        nome,
        sobrenome,
        email,
        senha,
        profissao,
        idade,
      });
      setErro(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={{ fontWeight: "bold", fontSize: 35 }}>
          Welcome to criate user
        </Text>
        <Text style={{ fontWeight: "300" }}>Faça o login</Text>
      </View>
      <View style={styles.viewButton}>
        <TextInput
          mode="flat"
          style={{ width: "100%", marginTop: 10 }}
          placeholder="Email"
          value={email}
          onChangeText={(e) => setemail(e)}
        />
        <TextInput
          mode="flat"
          style={{ width: "100%", marginTop: 10 }}
          placeholder="Senha"
          value={senha}
          onChangeText={(e) => setSenha(e)}
        />
        <TextInput
          mode="flat"
          style={{ width: "100%", marginTop: 10 }}
          placeholder="Nome"
          value={nome}
          onChangeText={(e) => setNome(e)}
        />
        <TextInput
          mode="flat"
          style={{ width: "100%", marginTop: 10 }}
          placeholder="Sobrenome"
          value={sobrenome}
          onChangeText={(e) => setSobrenome(e)}
        />
        <TextInput
          mode="flat"
          style={{ width: "100%", marginTop: 10 }}
          placeholder="Idade"
          value={idade ? String(idade) : ""}
          onChangeText={(e) => {
            const parsedValue = parseInt(e);
            if (!isNaN(parsedValue)) {
              setIdade(parsedValue);
            } else {
              setIdade(0);
            }
          }}
        />
        <TextInput
          mode="flat"
          style={{ width: "100%", marginTop: 10 }}
          placeholder="Profissao"
          value={profissao}
          onChangeText={(e) => setProfissao(e)}
        />
        <Button
          onPress={() => handleCadastro()}
          mode="outlined"
          style={{ width: "90%", marginTop: 20 }}
        >
          Criar
        </Button>
      </View>
      {erro && <Text>{erro}</Text>}
    </View>
  );
};

export default CriarUsuario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  viewText: {
    width: "50%",
    marginLeft: 50,
  },
  viewButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    padding: 20,
  },
  viewImage: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
});
