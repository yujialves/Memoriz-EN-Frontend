import React, { useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as subjectsActions from "../../store/subjects/subjects.action";
import { Subjects, Grades } from "../../store/subjects/subjects.reducer";
import Colors from "../../constants/Colors";
import Spinner from "../../components/Spinner/Spinner";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/HomeNavigation/HomeNavigation";
import ExpView from "../../components/ExpView/ExpView";

const getTotalGrades = (grades: Grades) => {
  const totalGrade = grades.reduce((total, grade) => {
    return {
      solvable: total.solvable + grade.solvable,
      all: total.all + grade.all,
    };
  });
  return `${totalGrade.solvable}/${totalGrade.all}問`;
};

type Props = {
  navigation?: StackNavigationProp<RootStackParamList, "Detail">;
};

const SubjectsScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const subjects = useSelector(
    (state: { subjects: { subjects: Subjects } }) => state.subjects.subjects
  );
  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );
  const exp = useSelector(
    (state: { subjects: { exp: number } }) => state.subjects.exp
  );

  useEffect(() => {
    dispatch(subjectsActions.getSubjects(token));
  }, [dispatch]);

  if (subjects.length === 0) {
    return <Spinner width={40} height={40} />;
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
    >
      <ExpView exp={exp} />
      {subjects.map((subject, i) => (
        <TouchableOpacity
          key={i}
          style={styles.container}
          activeOpacity={0.7}
          onPress={() => {
            props.navigation!.navigate("Detail", {
              subjectId: subject.subjectId,
              subjectName: subject.name,
            });
          }}
        >
          <View style={styles.titleContaier}>
            <Text numberOfLines={1} style={styles.title}>
              {subject.name}
            </Text>
          </View>
          <View style={styles.gradesContainer}>
            <Text numberOfLines={1} style={styles.grades}>
              {getTotalGrades(subject.grades)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  screen: {
    flex: 1,
    paddingVertical: 8,
  },
  contentContainer: {
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 72,
    width: Dimensions.get("screen").width * 0.8,
    marginVertical: 12,
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  titleContaier: {
    flex: 5,
  },
  title: {
    fontSize: 18,
    color: Colors.boldText,
    fontWeight: "bold",
    paddingLeft: 12,
    paddingVertical: 24,
  },
  gradesContainer: {
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  grades: {
    paddingBottom: 8,
    paddingRight: 12,
    fontWeight: "bold",
    color: Colors.boldText,
  },
});

export default SubjectsScreen;
