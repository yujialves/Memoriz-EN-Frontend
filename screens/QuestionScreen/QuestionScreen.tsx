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

  const onCorrect = () => {
    dispatch(questionActions.correctAnwer(question.id as number, subjectId));
    setShowAnswer(false);
  };

  const onInCorrect = () => {
    dispatch(questionActions.inCorrectAnwer(question.id as number, subjectId));
    setShowAnswer(false);
  };

  if (question.loading) {
    return <Spinner width={40} height={40} />;
  }

  console.log(
    /[ぁ-んァ-ン一-龥]/.test(
      showAnswer ? (question.answer as string) : (question.question as string)
    )
  );

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderController
        subject={subject.name}
        grade={question.grade as number}
        rest={question.rest as number}
        onSpeech={onSpeech}
        disablePlay={/[ぁ-んァ-ン一-龥]/.test(
          showAnswer
            ? (question.answer as string)
            : (question.question as string)
        )}
      />
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {question.rest !== 0
            ? showAnswer
              ? question.answer
              : question.question
            : "終了"}
        </Text>
      </View>
      {question.rest !== 0 && (
        <View style={styles.bottomContainer}>
          <BottomController
            showAnswer={showAnswer}
            onShow={() => setShowAnswer((state) => !state)}
            onCorrect={onCorrect}
            onInCorrect={onInCorrect}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  questionContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 17,
    paddingHorizontal: 4,
  },
  question: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.boldText,
    textAlign: "center",
  },
  bottomContainer: {
    flex: 1,
  },
});

export default QuestionScreen;
