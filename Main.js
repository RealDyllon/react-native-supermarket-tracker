import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import DeliveryStatusCard from "./components/DeliveryStatusCard";
import { useColorScheme } from "react-native-appearance";

const Main = () => {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Tracker App" titleStyle={null} />

        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <View style={isDark ? styles.darkContainer : styles.lightContainer}>
        <View style={{ paddingTop: 6}}>
          <DeliveryStatusCard
            title="Supermarket 1"
            available={true}
            cartUrl="https://www.fairprice.com.sg/cart"
          />
          <DeliveryStatusCard title="Supermarket 2" available={false} />
          <DeliveryStatusCard
            title="Supermarket 3"
            available={false}
            error={true}
          />
        </View>
      </View>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  darkContainer: {
    backgroundColor: "#000000",
    flex: 1,
  },
  lightContainer: {
    backgroundColor: "#ffffff",
  },
});
