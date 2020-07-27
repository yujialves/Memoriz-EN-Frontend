import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
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
      />
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
    paddingTop: 40,
    alignItems: "center",
  },
});

export default DetailScreen;
