import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";
type CardsProps = {
  data: {
    nome: string;
    email: string;
    profissao: string;
    idade: number;
  };
};

const Cards = ({ data }: CardsProps) => {
  return (
    <Card style={{ marginTop: 20, padding: 10 }}>
      <Card.Title title={data.nome} />
      <Card.Content>
        <Text>{data.email}</Text>
        <Text>{data.profissao}</Text>
        <Text>{data.idade}</Text>
      </Card.Content>
    </Card>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    padding: 20,
  },
});
