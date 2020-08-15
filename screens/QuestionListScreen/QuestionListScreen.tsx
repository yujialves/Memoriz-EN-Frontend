import React, { useEffect } from "react";
import { View, StyleSheet, Text, ListView, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as questionListAction from "../../store/actions/questionList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/HomeNavigation/HomeNavigation";
import { RouteProp } from "@react-navigation/native";

type Props = {
  navigation?: StackNavigationProp<RootStackParamList, "QuestionList">;
  route?: RouteProp<RootStackParamList, "QuestionList">;
};

const QuestionListScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );

  useEffect(() => {
    dispatch(
      questionListAction.fetchQuestionList(props.route!.params.subjectId, token)
    );
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ScrollView></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default QuestionListScreen;
