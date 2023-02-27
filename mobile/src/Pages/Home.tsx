import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ParamListBase } from "@react-navigation/routers";

const Home = () => {
  const { navigate } = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={{ fontWeight: "bold", fontSize: 35 }}>
          Welcome to home app
        </Text>
        <Text style={{ fontWeight: "300" }}>Bem vindo ao app</Text>
      </View>
      <View style={styles.viewButton}>
        <Button
          onPress={() => navigate("Login")}
          mode="outlined"
          style={{ width: "90%", marginTop: 20 }}
        >
          Login
        </Button>
        <Button
          onPress={() => navigate("CriarUsuario")}
          mode="outlined"
          style={{ width: "90%", marginTop: 20 }}
        >
          Cadastrar
        </Button>
      </View>
      <View style={styles.viewImage}>
        <Image
          style={{ resizeMode: "cover", width: "100%", height: "100%" }}
          source={require("../imgs/casa.png")}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: 100,
  },
  viewText: {
    width: "50%",
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
