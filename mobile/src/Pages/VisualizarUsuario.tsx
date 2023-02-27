import { StyleSheet, View, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ParamListBase } from "@react-navigation/routers";
import useAuth from "../hooks/useAuth";
import api from "../axios/api";

import { Text } from "react-native-paper";
import Cards from "../components/Cards";

const VisualizarUsuario = () => {
  const { navigate } = useNavigation<NavigationProp<ParamListBase>>();
  const { usuario }: any = useAuth();

  const [users, setUsers] = useState([]);

  const handleDados = async () => {
    try {
      const response = await api.get("/buscarUsuarios");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleDados();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={{ fontWeight: "bold", fontSize: 35 }}>
          Welcome <Text>{usuario.nome}</Text> to Visualize users app
        </Text>
        <Text style={{ fontWeight: "300" }}>Bem vindo ao app</Text>
      </View>
      <ScrollView>
        {users &&
          users.map((item: any, index) => {
            return (
              <Cards
                key={index}
                data={{
                  nome: item.nome,
                  email: item.email,
                  profissao: item.profissao,
                  idade: item.idade,
                }}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default VisualizarUsuario;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: 100,
  },
  viewText: {
    width: "70%",
    marginLeft: 50,
  },
  viewButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  viewImage: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
