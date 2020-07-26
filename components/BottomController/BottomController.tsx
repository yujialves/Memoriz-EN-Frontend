import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../../constants/Colors";

type Props = {
  showAnswer: boolean;
  onPressShowButton: () => void;
};

const BottomController: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {}}
        style={styles.inCorrectButton}
      >
        <Text style={styles.buttonTitle}>不正解</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.onPressShowButton}
        style={styles.showButton}
      >
        <Text style={styles.buttonTitle}>
          {props.showAnswer ? "問題" : "正解"}を表示
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {}}
        style={styles.correctButton}
      >
        <Text style={styles.buttonTitle}>正解</Text>
      </TouchableOpacity>
    </View>
  );
};

const buttonStyle = {
  marginHorizontal: 10,
  width: 92,
  height: 40,
  borderWidth: 2,
  borderRadius: 20,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inCorrectButton: {
    ...buttonStyle,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#99f",
  },
  showButton: {
    ...buttonStyle,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gold",
    width: 100,
  },
  correctButton: {
    ...buttonStyle,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#f99",
  },
  buttonTitle: {
    fontWeight: "bold",
    color: Colors.boldText,
  },
});

export default BottomController;
