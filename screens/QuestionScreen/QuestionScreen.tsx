import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import HeaderController from "../../components/HeaderController/HeaderController";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../store/actions/question";
import { Subjects } from "../../Memoriz-EN-Frontend/store/reducers/subjectsReducer";
import { Question } from "../../store/reducers/questionReducer";
import Spinner from "../../components/Spinner/Spinner";
import Colors from "../../constants/Colors";
import BottomController from "../../components/BottomController/BottomController";
import * as questionActions from "../../store/actions/question";

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

  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    dispatch(getQuestion(subjectId));
  }, [dispatch]);

  const onSpeech = () => {
    const uttr = new SpeechSynthesisUtterance(
      showAnswer ? (question.answer as string) : (question.question as string)
    );
    uttr.lang = "en-US";
    speechSynthesis.speak(uttr);
  };

  if (question.loading) {
    return <Spinner width={40} height={40} />;
  }

  return (
    <View style={styles.screen}>
      <HeaderController
        subject={subjectName}
        grade={question.grade as number}
        onSpeech={onSpeech}
      />
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {showAnswer ? question.answer : question.question}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <BottomController
          showAnswer={showAnswer}
          onShow={() => setShowAnswer((state) => !state)}
          onCorrect={() =>
            dispatch(
              questionActions.correctAnwer(question.id as number, subjectId)
            )
          }
          onInCorrect={() =>
            dispatch(
              questionActions.inCorrectAnwer(question.id as number, subjectId)
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  questionContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 8,
    paddingHorizontal: 4,
  },
  question: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.boldText,
  },
  bottomContainer: {
    flex: 1,
  },
});

export default QuestionScreen;
