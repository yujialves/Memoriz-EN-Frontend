import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as subjectsActions from "../../store/actions/subjects";
import * as startActions from "../../store/actions/start";
import * as questionActions from "../../store/actions/question";

type Props = {
  subject: string;
  grade: number;
  rest: number;
  disablePlay: boolean;
  disableBingPlay: boolean;
  onSpeech: () => void;
  onBing: () => void;
};

const HeaderController: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );

  const endButtonHandler = () => {
    dispatch(subjectsActions.getSubjects(token));
    dispatch(
      questionActions.setQuestion({
        id: 0,
        question: "",
        answer: "",
        grade: 0,
        rest: 0,
      })
    );
    dispatch(startActions.setStarted(false, 0));
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subject} data-test="subject">
            {props.subject}: G{props.grade}
          </Text>
          <Text style={styles.subject} data-test="subject">
            残り{props.rest}問
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.endButton}
            activeOpacity={0.7}
            onPress={endButtonHandler}
            data-test="end-button"
          >
            <Text style={styles.endText} data-test="end-text">
              終了
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              !("speechSynthesis" in window) || props.disablePlay
                ? styles.disabledButton
                : styles.playButton
            }
            activeOpacity={0.7}
            disabled={!("speechSynthesis" in window) || props.disablePlay}
            onPress={props.onSpeech}
            data-test="play-button"
          >
            <Ionicons
              name="ios-musical-note"
              size={24}
              color={
                !("speechSynthesis" in window) || props.disablePlay
                  ? Colors.boldText
                  : "orange"
              }
              data-test="icon"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              !("speechSynthesis" in window) ||
              props.disablePlay ||
              props.disableBingPlay
                ? styles.disabledButton
                : styles.activeBingButton
            }
            activeOpacity={0.7}
            disabled={
              !("speechSynthesis" in window) ||
              props.disablePlay ||
              props.disableBingPlay
            }
            onPress={props.onBing}
            data-test="play-button"
          >
            <Text
              style={
                !("speechSynthesis" in window) ||
                props.disablePlay ||
                props.disableBingPlay
                  ? styles.disabledText
                  : styles.activeBingText
              }
            >
              Bing
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const buttonStyles = {
  width: 100,
  height: 32,
  borderRadius: 16,
  borderWidth: 2,
  shadowColor: "black",
  shadowRadius: 8,
  shadowOpacity: 0.1,
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subject: {
    color: Colors.boldText,
    fontWeight: "bold",
    fontSize: 16,
  },
  endButton: {
    ...buttonStyles,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  endText: {
    fontWeight: "bold",
    color: Colors.boldText,
  },
  playButton: {
    ...buttonStyles,
    alignSelf: "flex-end",
    marginTop: 8,
    borderColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    ...buttonStyles,
    alignSelf: "flex-end",
    marginTop: 8,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  activeBingButton: {
    ...buttonStyles,
    alignSelf: "flex-end",
    marginTop: 8,
    borderColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledText: {
    color: Colors.boldText,
    fontWeight: "bold",
  },
  activeBingText: {
    color: "lightgreen",
    fontWeight: "bold",
  },
});

export default HeaderController;
