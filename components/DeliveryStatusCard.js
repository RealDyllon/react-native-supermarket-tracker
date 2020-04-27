import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const iconData = {
  available: {
    name: "check",
    color: "green",
  },
};

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const RightContent = (props) => (
  <View style={styles.rightContent}>
    <FontAwesome5
      name={props.status === "available" && "check"}
      color={props.status === "available" && "green"}
      size={32}
    />
  </View>
);

const DeliveryStatusCard = (props) => {
  return (
    <Card elevation={5} style={styles.wrapper}>
      <Card.Title
        title={props.title}
        right={() =>
          RightContent({
            status: props.available ? "available" : "unavailable",
          })
        }
      />

      <Card.Actions>
        <Button>Go to Shopping Cart</Button>
      </Card.Actions>
    </Card>
  );
};

export default DeliveryStatusCard;

const styles = StyleSheet.create({
  wrapper: {
    margin: 12,
    borderRadius: 12,
  },
  rightContent: {
    display: "flex",
    backgroundColor: "red",
    flexDirection: "column",
    margin: 12,
  },
});
