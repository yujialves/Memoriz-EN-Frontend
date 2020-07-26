import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

type Props = {
  subject: string;
  grade: string;
};

const HeaderController: React.FC<Props> = (props) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.subject} data-test="subject">
          {props.subject}: {props.grade}
        </Text>
        <TouchableOpacity
          style={styles.endButton}
          activeOpacity={0.7}
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
