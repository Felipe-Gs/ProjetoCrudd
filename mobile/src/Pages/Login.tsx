import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ParamListBase } from "@react-navigation/routers";

import useAuth from "../hooks/useAuth";

const Login = () => {
  const { navigate } = useNavigation<NavigationProp<ParamListBase>>();
  const [email, setemail] = useState<string>("");
  const [senha, setsenha] = useState<string>("");
  const { handleLogin, erro, usuario }: any = useAuth();

  useEffect(() => {
    {
      usuario.nome && navigate("VisualizarUsuario");
    }
  }, [usuario]);
  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={{ fontWeight: "bold", fontSize: 35 }}>
          Welcome to Login app
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
          onChangeText={(e) => setsenha(e)}
        />
        <Button
          onPress={() => handleLogin(email, senha)}
          mode="outlined"
          style={{ width: "90%", marginTop: 20 }}
        >
          Entrar
        </Button>
      </View>
      {erro && <Text>{erro}</Text>}
      {/* {usuario && <Text>{usuario.sobrenome}</Text>} */}
    </View>
  );
};

export default Login;

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
    marginTop: 100,
    padding: 20,
  },
  viewImage: {
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
});
