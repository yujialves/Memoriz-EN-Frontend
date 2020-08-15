import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SubjectsScreen from "../../screens/SubjectsScreen/SubjectsScreen";
import Colors from "../../constants/Colors";
import DetailScreen from "../../screens/DetailScreen/DetailScreen";
import { useSelector } from "react-redux";
import QuestionScreen from "../../screens/QuestionScreen/QuestionScreen";
import { RouteProp } from "@react-navigation/native";
import QuestionListScreen from "../../screens/QuestionListScreen/QuestionListScreen";

const StackNavigator = createStackNavigator();

export type RootStackParamList = {
  Subjects: undefined;
  Detail: { subjectId: number; subjectName: string };
  QuestionList: { subjectId: number };
};

type RootContainer = {
  route: RouteProp<Record<string, any | undefined>, "Detail">;
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
          height: 88,
        },
        headerTintColor: Colors.tintColor,
      }}
    >
      <StackNavigator.Screen
        name="QuestionList"
        component={QuestionListScreen}
        options={{
          title: "問題一覧",
        }}
        data-test="screen"
      />
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
        options={({ route }: RootContainer) => {
          return { title: route.params!.subjectName };
        }}
        data-test="screen"
      />
    </StackNavigator.Navigator>
  );
};

export default HomeNavigation;
