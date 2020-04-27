import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import DeliveryStatusCard from "./components/DeliveryStatusCard";

const Main = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Supermarket Tracker" />

        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <View>
        <DeliveryStatusCard title="Supermarket 1" available={true} />
        <DeliveryStatusCard title="Supermarket 2" available={true} />
        <DeliveryStatusCard title="Supermarket 3" available={true} />
      </View>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
