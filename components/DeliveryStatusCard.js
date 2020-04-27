import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Surface,
} from "react-native-paper";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const iconData = {
  available: {
    name: "check",
    color: "green",
  },
};

const openShoppingCartUrl = (cartUrl) => {
  WebBrowser.openBrowserAsync(cartUrl);
  // Linking.openURL(cartUrl);
};

const StatusIcon = (props) => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome5
        name={
          props.error
            ? "exclamation-triangle"
            : props.available
            ? "check"
            : "times"
        }
        color={
          props.error ? "#e14337" : props.available ? "#00C851" : "#f08e38"
        }
        size={props.error ? 42 : props.available ? 48 : 58}
      />
    </View>
  );
};

const DeliveryStatusCard = (props) => {
  return (
    <Card elevation={3} style={styles.wrapper}>
      <Card.Content style={styles.cardContent}>
        <View style={{ flex: 0 }}>
          <Title sty>{props.title}</Title>
          <Paragraph>
            {props.error ? (
              <Text>Error!!</Text>
            ) : props.available ? (
              <Text>Delivery Available</Text>
            ) : (
              <Text>Delivery Unavailable</Text>
            )}
          </Paragraph>
        </View>
        <View style={styles.rightContent}>
          <StatusIcon available={props.available} error={props.error} />
        </View>
      </Card.Content>

      <Card.Actions>
        {props.available && (
          <Button onPress={() => openShoppingCartUrl(props.cartUrl)}>
            Go to Shopping Cart.
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

export default DeliveryStatusCard;

const styles = StyleSheet.create({
  wrapper: {
    margin: 12,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
  },
  rightContent: {
    flex: 1,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    // backgroundColor: "red",
  },
});
