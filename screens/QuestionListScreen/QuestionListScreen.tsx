import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ListView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as questionListAction from "../../store/actions/questionList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/HomeNavigation/HomeNavigation";
import { RouteProp } from "@react-navigation/native";
import Spinner from "../../components/Spinner/Spinner";
import { Question } from "../../store/reducers/questionListReducer";
import { Divider } from "react-native-elements";

type Props = {
  navigation?: StackNavigationProp<RootStackParamList, "QuestionList">;
  route?: RouteProp<RootStackParamList, "QuestionList">;
};

const QuestionListScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );
  const isLoading = useSelector(
    (state: { loadings: { isFetchingQuestionList: boolean } }) =>
      state.loadings.isFetchingQuestionList
  );
  const questionList = useSelector(
    (state: { questionList: { questionList: Question[] } }) =>
      state.questionList.questionList
  );

  const questions: Question[] = [
    {
      id: 0,
      question: "questionfdafdsafdsafdsafdsafdsafdsafdsafsdafdsa",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 1,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 2,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 3,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 4,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 5,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 6,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 7,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 8,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 9,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 10,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 11,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 12,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 13,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 14,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 15,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
    {
      id: 16,
      question: "question",
      answer: "answer",
      grade: 0,
      correctCountSum: 10,
      inCorrectCountSum: 10,
    },
  ];

  // useEffect(() => {
  //   dispatch(
  //     questionListAction.fetchQuestionList(props.route!.params.subjectId, token)
  //   );
  // }, [dispatch]);

  if (isLoading) {
    return <Spinner width={40} height={40} />;
  }

  return (
    <View style={styles.screen}>
      <ScrollView>
        {questions.map((question) => (
          <View key={question.id}>
            <TouchableOpacity
              style={styles.questionContainer}
              activeOpacity={0.7}
            >
              <View style={styles.question}>
                <Text numberOfLines={1} style={styles.questionLabel}>
                  {question.question}
                </Text>
              </View>
              <View style={styles.grade}>
                <Text style={styles.gradeLabel}>
                  {"G" + question.grade.toString()}
                </Text>
              </View>
            </TouchableOpacity>
            <Divider />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  questionContainer: {
    height: 48,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  question: {
    paddingLeft: 24,
    justifyContent: "center",
    width: Dimensions.get("window").width - 48,
  },
  questionLabel: {
    fontSize: 16,
    color: Colors.boldText,
    fontWeight: "bold",
  },
  grade: {
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  gradeLabel: {
    fontSize: 18,
    color: Colors.boldText,
    fontWeight: "bold",
  },
});

export default QuestionListScreen;
