import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SubjectsScreen from "../../screens/SubjectsScreen/SubjectsScreen";
import Colors from "../../constants/Colors";
import DetailScreen from "../../screens/DetailScreen/DetailScreen";

const StackNavigator = createStackNavigator();

export type RootStackParamList = {
  Subjects: undefined;
  Detail: undefined;
};

const HomeNavigation: React.FC = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.tintColor,
      }}
    >
      <StackNavigator.Screen
        name="Subjects"
        component={SubjectsScreen}
        options={{
          title: "分野一覧",
        }}
        data-test="screen"
      />
      <StackNavigator.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "詳細" }}
        data-test="screen"
      />
    </StackNavigator.Navigator>
  );
};

export default HomeNavigation;
