import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import HeaderController from "../../components/HeaderController/HeaderController";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../store/actions/question";
import { Subjects } from "../../store/reducers/subjectsReducer";
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
  const subject = useSelector(
    (state: { subjects: { subjects: Subjects } }) => state.subjects.subjects
  ).filter((subject) => {
    return subject.subjectId === subjectId;
  })[0];
  const question = useSelector(
    (state: { question: Question }) => state.question
  );
  const isLoadingQuestion = useSelector(
    (state: { loadings: { isLoadingQuestion: boolean } }) =>
      state.loadings.isLoadingQuestion
  );
  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );

  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    dispatch(getQuestion(subjectId, token));
  }, [dispatch]);

  const onSpeech = () => {
    const uttr = new SpeechSynthesisUtterance(
      showAnswer ? question.answer : question.question
    );
    uttr.lang = "en-US";
    speechSynthesis.speak(uttr);
  };

  const onCorrect = () => {
    dispatch(questionActions.correctAnwer(question.id, subjectId, token));
    setShowAnswer(false);
  };

  const onInCorrect = () => {
    dispatch(questionActions.inCorrectAnwer(question.id, subjectId, token));
    setShowAnswer(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderController
        subject={subject.name}
        grade={question.grade}
        rest={question.rest}
        onSpeech={onSpeech}
        disablePlay={/[ぁ-んァ-ン一-龥]/.test(
          showAnswer ? question.answer : question.question
        )}
      />
      <View style={styles.questionContainer}>
        {isLoadingQuestion ? (
          <Spinner width={40} height={40} />
        ) : (
          <Text style={styles.question}>
            {question.rest !== 0
              ? showAnswer
                ? question.answer
                : question.question
              : "終了"}
          </Text>
        )}
      </View>
      <BottomController
        showAnswer={showAnswer}
        onShow={() => setShowAnswer((state) => !state)}
        onCorrect={onCorrect}
        onInCorrect={onInCorrect}
        display={question.rest !== 0}
        disabled={isLoadingQuestion}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  questionContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  question: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.boldText,
    textAlign: "center",
    width: "90%",
  },
});

export default QuestionScreen;
