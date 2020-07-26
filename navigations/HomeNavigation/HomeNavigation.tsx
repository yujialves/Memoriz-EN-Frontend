import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SubjectsScreen from "../../screens/SubjectsScreen/SubjectsScreen";
import Colors from "../../constants/Colors";
import DetailScreen from "../../screens/DetailScreen/DetailScreen";
import { useSelector } from "react-redux";
import QuestionScreen from "../../screens/QuestionScreen/QuestionScreen";

const StackNavigator = createStackNavigator();

export type RootStackParamList = {
  Subjects: undefined;
  Detail: { subject_id: number };
};

const HomeNavigation: React.FC = () => {
  const started = useSelector(
    (state: { start: { started: boolean } }) => state.start.started
  );

  if (started) {
    return <QuestionScreen />;
  }

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
