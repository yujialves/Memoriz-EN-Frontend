import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import HeaderController from "../../components/HeaderController/HeaderController";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../store/actions/question";
import { Subjects } from "../../Memoriz-EN-Frontend/store/reducers/subjectsReducer";
import { Question } from "../../store/reducers/questionReducer";
import Spinner from "../../components/Spinner/Spinner";

const QuestionScreen: React.FC = () => {
  const dispatch = useDispatch();
  const subjectId = useSelector(
    (state: { start: { subjectId: number } }) => state.start.subjectId
  );
  const subjectName = useSelector(
    (state: { subjects: { subjects: Subjects } }) => state.subjects.subjects
  ).filter((subject) => {
    return subject.subjectId === subjectId;
  })[0].name;
  const question = useSelector(
    (state: { question: Question }) => state.question
  );

  useEffect(() => {
    dispatch(getQuestion(subjectId));
  }, [dispatch]);

  if (question.loading) {
    return <Spinner width={40} height={40} />;
  }

  console.log(question);

  return (
    <View style={styles.screen}>
      <HeaderController
        subject={subjectName}
        grade={question.grade as number}
      />
      <View>{}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default QuestionScreen;
