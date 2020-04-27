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
    <View style={styles.wrapper}>
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          // left={LeftContent}
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
    </View>
  );
};

export default DeliveryStatusCard;

const styles = StyleSheet.create({
  wrapper: {
    margin: 12,
  },
  rightContent: {
    margin: 12,
  },
});
