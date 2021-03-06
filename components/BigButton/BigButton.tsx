import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
} from "react-native";
import Colors from "../../constants/Colors";

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

const BigButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={props.onPress}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 44,
    width: 260,
    borderColor: Colors.primary,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.boldText,
  },
});

export default BigButton;
