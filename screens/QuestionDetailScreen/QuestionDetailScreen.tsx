import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/HomeNavigation/HomeNavigation";
import { Divider } from "react-native-elements";
import GradesTransitionView from "../../components/GradesTransitionView/GradesTransitionView";

type Props = {
  route?: RouteProp<RootStackParamList, "QuestionDetail">;
};

const QuestionDetailScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>問題：</Text>
        <Text style={styles.content}>
          {props.route!.params.question.question}
        </Text>
      </View>
      <Divider />
      <View style={styles.container}>
        <Text style={styles.title}>正解：</Text>
        <Text style={styles.content}>
          {props.route!.params.question.question}
        </Text>
      </View>
      <Divider />
      <View style={styles.container}>
        <GradesTransitionView
          gradeUp={props.route!.params.question.correctCountSum}
          gradeDown={props.route!.params.question.inCorrectCountSum}
          gradeDownText="総不正解数"
          gradeUpText="総正解数"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.boldText,
  },
  container: {
    paddingTop: 8,
  },
  content: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.boldText,
    marginVertical: 32,
  },
});

export default QuestionDetailScreen;
