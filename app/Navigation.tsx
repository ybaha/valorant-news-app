import React from "react";
import {
  Button,
  Image,
  NativeBaseProvider,
  Pressable,
  Text,
  View,
} from "native-base";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/Main";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";

const Drawer = createDrawerNavigator();

const Article = () => {
  return (
    <View>
      <Text>Sealmar</Text>
    </View>
  );
};

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

const Navigation = () => {
  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => (
            <SafeAreaView style={{ flex: 1 }}>
              <View
                style={{
                  height: 200,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  width={"100%"}
                  height={200}
                  alt="Valorant Wallpaper"
                  source={require("./assets/valorant_wp.webp")}
                ></Image>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          )}
          screenOptions={{
            headerRight: () => (
              <Image
                source={require("./assets/valorant_logo.png")}
                alt="Valorant Logo"
                width={16}
                height={"40%"}
                resizeMode={"contain"}
              ></Image>
            ),
            drawerActiveBackgroundColor: "gray",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "black",
              shadowColor: "transparent",
            },
            drawerStyle: { backgroundColor: "black" },
            drawerActiveTintColor: "yellow",
            drawerInactiveTintColor: "#999999",
            // overlayColor: "rgba(0,0,0,0.6)",
          }}
        >
          <Drawer.Screen
            options={{
              headerTitleStyle: { color: "black" },
              // headerRight: () => (
              //   <View>
              //     <Button
              //       size="sm"
              //       variant="link"
              //       color="red.600"
              //       colorScheme="red"
              //       borderColor="red.600"
              //       py={0.5}
              //       _text={{ fontSize: 16, marginRight: 4 }}
              //       onPressOut={() => setShowFilterModal(!showFilterModal)}
              //     >
              //       Filter
              //     </Button>
              //   </View>
              // ),
            }}
            name="Feed"
            component={Main}
          />
          <Drawer.Screen name="Article" component={Article} />
        </Drawer.Navigator>
      </NavigationContainer>
      {/* {user ? (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerStyle: { backgroundColor: "#181818" },
                headerTintColor: "white",
              }}
              name="CreateAccount"
              component={Main}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : isLoginScreen ? (
        <Login />
      ) : (
        <CreateAccount />
      )} */}
    </NativeBaseProvider>
  );
};

export default Navigation;
