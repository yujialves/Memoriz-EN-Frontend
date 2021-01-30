import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/HomeNavigation/HomeNavigation";
import { useDispatch } from "react-redux";
import { setStarted } from "../../store/start/start.action";

type Props = {
  navigation?: StackNavigationProp<RootStackParamList, "Detail">;
  subjectId: number;
};

const StartButton: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => dispatch(setStarted(true, props.subjectId))}
      data-test="button"
    >
      <Text style={styles.text} data-test="text">
        スタート
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 40,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOpacity: 0.1
  },
  text: {
    fontWeight: "bold",
    color: Colors.boldText,
    fontSize: 16,
  },
});

export default StartButton;
