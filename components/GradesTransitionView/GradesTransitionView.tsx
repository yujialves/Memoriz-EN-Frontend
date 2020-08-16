import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/Colors";

type Props = {
  gradeUp: number;
  gradeDown: number;
  gradeUpText: string;
  gradeDownText: string;
};

const GradesTransitionView: React.FC<Props> = (props) => {
  return (
    <View style={styles.gradesContainer}>
      <View style={styles.gradeContainer}>
        <Text style={styles.gradeTitle} data-test="title">
          {props.gradeDownText}
        </Text>
        <View style={styles.gradeTextContainer}>
          <Text style={styles.gradeText} data-test="grade-changes">
            {props.gradeDown}
          </Text>
        </View>
      </View>
      <View style={styles.gradeContainer}>
        <Text style={styles.gradeTitle} data-test="title">
          {props.gradeUpText}
        </Text>
        <View style={styles.gradeTextContainer}>
          <Text style={styles.gradeText} data-test="grade-changes">
            {props.gradeUp}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradesContainer: {
    height: 80,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  gradeContainer: {
    alignItems: "center",
  },
  gradeTitle: {
    color: Colors.boldText,
    fontWeight: "bold",
    textAlign: "center",
  },
  gradeTextContainer: {
    height: 40,
    width: 80,
    borderColor: Colors.border,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  gradeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.boldText,
  },
});

export default GradesTransitionView;
