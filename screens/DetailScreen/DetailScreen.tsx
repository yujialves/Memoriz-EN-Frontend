import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import Chart from "react-apexcharts";
import options from "../../options/chartOption";
import { Subjects } from "../../store/reducers/subjectsReducer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/HomeNavigation/HomeNavigation";
import { useSelector } from "react-redux";
import { RouteProp } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import GradesTransitionView from "../../components/GradesTransitionView/GradesTransitionView";
import StartButton from "../../components/StartButton/StartButton";

type Props = {
  navigation?: StackNavigationProp<RootStackParamList, "Detail">;
  route?: RouteProp<RootStackParamList, "Detail">;
};

const DetailScreen: React.FC<Props> = (props) => {
  const subject = useSelector(
    (state: { subjects: { subjects: Subjects } }) => state.subjects.subjects
  ).filter((subject) => {
    return subject.subjectId === props.route!.params.subjectId;
  })[0];

  const series = [
    {
      data: subject.grades.map((grade) => grade.solvable),
    },
    {
      data: subject.grades.map((grade) => grade.all - grade.solvable),
    },
  ];
  return (
    <View style={styles.screen}>
      <View style={styles.chartContainer}>
        <Chart
          options={options}
          series={series}
          type="bar"
          width="100%"
          height={Dimensions.get("window").width * 0.9}
        />
      </View>
      <GradesTransitionView
        gradeDown={subject.inCorrectCount}
        gradeUp={subject.correctCount}
        gradeDownText="今日の不正解数"
        gradeUpText="今日の正解数"
      />
      <View style={styles.questionButtonContainer}>
        <TouchableOpacity
          style={styles.questionsBtn}
          activeOpacity={0.7}
          onPress={() =>
            props.navigation!.navigate("QuestionList", {
              subjectId: props.route!.params.subjectId,
            })
          }
        >
          <Text style={styles.questionButtonText}>問題一覧</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <StartButton subjectId={props.route!.params.subjectId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  chartContainer: {
    paddingRight: 20,
  },
  buttonContainer: {
    paddingTop: 28,
    paddingBottom: 16,
    alignItems: "center",
  },
  questionButtonContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  questionsBtn: {
    width: 200,
    height: 40,
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
  questionButtonText: {
    fontWeight: "bold",
    color: Colors.boldText,
    fontSize: 16,
  },
});

export default DetailScreen;
