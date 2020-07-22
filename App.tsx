import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigation from "./navigations/HomeNavigation/HomeNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <HomeNavigation />
    </NavigationContainer>
  );
}