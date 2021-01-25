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
import { baseURL } from "../../secrets/constants";
import axios, { AxiosResponse } from "axios";

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
  const [audioBuffer, setAudioBuffer] = useState(null as null | AudioBuffer);
  const [failedToLoad, setFailedToLoad] = useState(false);
  let audioContext: AudioContext;

  useEffect(() => {
    dispatch(getQuestion(subjectId, token));
  }, [dispatch]);

  useEffect(() => {
    if (question.id === 0) return;
    const load = async () => {
      await loadBingSource();
    };
    load();
  }, [question]);

  useEffect(() => {
    console.log("create audiocontext");
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      console.log("close");
      audioContext.close();
    };
  });

  const loadBingSource = async () => {
    setFailedToLoad(false);
    await axios
      .post(
        baseURL + "question/bing",
        JSON.stringify({
          word: /[ぁ-んァ-ン一-龥]/.test(question.question)
            ? question.answer
            : question.question,
        }),
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((axiosRes) => {
        const res = axiosRes as AxiosResponse<any>;
        console.log(res);
        console.log(res.data);
        if (res.status === 200) {
          try {
            const buffer: ArrayBuffer = res.data;
            audioContext.decodeAudioData(
              buffer,
              (buffer) => {
                setAudioBuffer(buffer);
              },
              (err) => {
                console.log("buffer error");
                console.log(err);
                setFailedToLoad(true);
              }
            );
          } catch (err) {
            console.log("catch");
            console.log(err);
            setFailedToLoad(true);
          }
        } else {
          console.log("not 200");
          setFailedToLoad(true);
        }
      })
      .catch((err) => {
        console.log("axios error");
        console.log(err);
        setFailedToLoad(true);
      });
  };

  const onSpeech = () => {
    const uttr = new SpeechSynthesisUtterance(
      showAnswer ? question.answer : question.question
    );
    uttr.lang = "en-US";
    speechSynthesis.speak(uttr);
  };

  const onBingSpeech = () => {
    const source = audioContext!.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext!.destination);
    source.start(audioContext!.currentTime);
  };

  const onCorrect = () => {
    setAudioBuffer(null);
    dispatch(questionActions.correctAnwer(question.id, subjectId, token));
    setShowAnswer(false);
  };

  const onInCorrect = () => {
    setAudioBuffer(null);
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
        onBing={onBingSpeech}
        disablePlay={/[ぁ-んァ-ン一-龥]/.test(
          showAnswer ? question.answer : question.question
        )}
        disableBingPlay={audioBuffer == null}
        failedToLoad={failedToLoad}
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
