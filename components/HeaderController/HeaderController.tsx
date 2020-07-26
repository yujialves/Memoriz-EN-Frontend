import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import * as subjectsActions from "../../store/actions/subjects";
import * as startActions from "../../store/actions/start";
import * as questionActions from "../../store/actions/question";

type Props = {
  subject: string;
  grade: number;
};

const HeaderController: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const endButtonHandler = () => {
    dispatch(subjectsActions.getSubjects());
    dispatch(
      questionActions.setQuestion({ question: null, answer: null, grade: null })
    );
    dispatch(startActions.setStarted(false, 0));
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.subject} data-test="subject">
          {props.subject}: G{props.grade}
        </Text>
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
      </View>
      <TouchableOpacity
        style={styles.playButton}
        activeOpacity={0.7}
        data-test="play-button"
      >
        <Ionicons
          name="ios-musical-note"
          size={24}
          color="orange"
          data-test="icon"
        />
      </TouchableOpacity>
    </View>
  );
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
    width: 100,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  endText: {
    fontWeight: "bold",
    color: Colors.boldText,
  },
  playButton: {
    alignSelf: "flex-end",
    width: 100,
    height: 32,
    marginTop: 8,
    borderColor: "orange",
    borderWidth: 2,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeaderController;
