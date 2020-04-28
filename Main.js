import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Appbar,
  TextInput,
  Button,
  Searchbar,
  Checkbox,
  TouchableRipple,
} from "react-native-paper";
import DeliveryStatusCard from "./components/DeliveryStatusCard";
import { useColorScheme } from "react-native-appearance";

const stores = {
  ntuc: {
    name: "NTUC FairPrice",
    url: "https://www.fairprice.com.sg/cart",
  },
  shengShiong: {
    name: "Sheng Shiong",
    url: "https://www.allforyou.sg/cart",
  },
  coldStorage: {
    name: "Cold Storage",
    url: "https://coldstorage.com.sg/checkout/cart",
  },
  giant: {
    name: "Giant",
    url: "https://giant.sg/checkout/cart",
  },
  redmart: {
    name: "Redmart",
    site: "redmart.com",
    url: "https://redmart-delivery-schedule.lazada.sg",
  },
};

const Main = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [postCodeInput, setPostCodeInput] = useState("");
  const [isRememberPostCode, setRememberPostCode] = useState(false);

  const [isNtucLoading, setNtucLoading] = useState(false);
  const [ntucStoreRes, setNtucStoreRes] = useState(null); // eslint-disable-line no-unused-vars
  const [ntucStoreErr, setNtucStoreErr] = useState(null);
  const [ntucStoreId, setNtucStoreId] = useState(null); // eslint-disable-line no-unused-vars
  const [ntucSlotRes, setNtucSlotRes] = useState(null);
  const [ntucSlotErr, setNtucSlotErr] = useState(null);
  const [isNtucUnserviceable, setNtucUnserviceable] = useState(false);

  // sheng shiong
  const [isShengShiongLoading, setShengShongLoading] = useState(false);
  const [shengShiongRes, setShengShiongRes] = useState(null);
  const [shengShiongErr, setShengShongErr] = useState(null);

  // cold storage
  const [isColdStorageLoading, setColdStorageLoading] = useState(false);
  const [coldStorageRes, setColdStorageRes] = useState(null);
  const [coldStorageErr, setColdStorageErr] = useState(null);

  // giant
  const [isGiantLoading, setGiantLoading] = useState(false);
  const [giantRes, setGiantRes] = useState(null);
  const [giantErr, setGiantErr] = useState(null);

  const handleCheckboxPress = () => {
    const currentState = isRememberPostCode;
    setRememberPostCode(!currentState);
  };
  const handleFormSubmit = (e) => {
    // request time!
    console.log("postCode", postCodeInput);

    if (postCodeInput.length === 6 && postCodeInput.substring(1) !== 0) {
      setPostCodeInvalid(false);

      setItemCardsVisible(true);

      setNtucLoading(true);
      setShengShongLoading(true);
      setColdStorageLoading(true);
      setGiantLoading(true);

      delayFunction(); // setFormSubmitted(true);

      const postCode = postCodeInput;

      const rememberPostCodePref = isRememberPostCode;

      if (rememberPostCodePref) {
        localStorage.setItem("postCode", postCode);
        localStorage.setItem("postCodeRememberPref", 1); //true
      } else {
        localStorage.removeItem("postCode");
        localStorage.removeItem("postCodeRememberPref"); //true
      }

      reqNtuc(postCode);
      reqShengShiong(postCode);
      reqColdStorage(postCode);
      reqGiant(postCode);
    } else {
      console.log("POSTCODE INVALID!!!");
      setPostCodeInvalid(true);
    }
  };

  const delayFunction = async () => {
    await delay(100);

    // Executed 100 milliseconds later
    setFormSubmitted(true);
  };

  const reqNtuc = (postCode) => {
    fetch(
      `https://website-api.omni.fairprice.com.sg/api/serviceable-area?city=Singapore&pincode=${postCode}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("ntucStoreRes", result);
          setNtucStoreRes(result);

          const storeId = result && result.data && result.data.store.id;
          setNtucStoreId(storeId);

          if (storeId) {
            console.log("ntuc storeId", storeId);

            fetch(
              `https://website-api.omni.fairprice.com.sg/api/slot-availability?address[pincode]=${postCode}&storeId=${storeId}`
            )
              .then((res) => res.json())
              .then(
                (result) => {
                  setNtucLoading(false);
                  setNtucSlotRes(result);
                  console.log("ntucSlotRes", result);
                },
                (error) => {
                  setNtucLoading(false);
                  // setNtucSlotRes(error);
                  setNtucSlotErr(error);
                  console.error("ntucSlotRes", error);
                }
              );
          } else {
            setNtucUnserviceable(true);
            setNtucLoading(false);
            console.log("ntucSlotRes", "NTUC does not serve this area omg");
          }
        },
        (error) => {
          setNtucStoreErr(error);
          setNtucLoading(false);
          console.error("ntucSlotRes", error);
        }
      );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Tracker App" titleStyle={null} />

        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <View style={isDark ? styles.darkContainer : styles.lightContainer}>
        <View style={{ paddingTop: 6 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Searchbar
              keyboardType="number-pad"
              style={{ margin: 12, flex: 1 }}
              placeholder="Postal code"
              value={postCodeInput}
              onChange={(e) => {
                console.log(e.nativeEvent.text);
                setPostCodeInput(e.nativeEvent.text);
              }}
            />
            {postCodeInput ? (
              <Button
                onPress={handleFormSubmit}
                mode="contained"
                style={{ marginRight: 12 }}
              >
                Search
              </Button>
            ) : null}
          </View>

          <TouchableRipple onPress={handleCheckboxPress}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 12,
              }}
            >
              <Checkbox.Android status={isRememberPostCode ? "checked" : "unchecked"} />
              <Text>Remember my postal code</Text>
            </View>
          </TouchableRipple>

          <DeliveryStatusCard
            title={stores.ntuc.name}
            cartUrl={stores.ntuc.url}
            loading={false}
            available={true}
          />
          <DeliveryStatusCard
            title={stores.coldStorage.name}
            cartUrl={stores.coldStorage.url}
            loading={false}
            available={false}
          />
          <DeliveryStatusCard
            title={stores.giant.name}
            cartUrl={stores.giant.url}
            loading={false}
            available={false}
            error={true}
          />

          <DeliveryStatusCard
            title={stores.shengShiong.name}
            cartUrl={stores.shengShiong.url}
            loading={false}
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
