import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../Memoriz-EN-Frontend/constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Memoriz-EN-Frontend/navigations/HomeNavigation/HomeNavigation";
import { useDispatch } from "react-redux";
import { setStarted } from "../../store/actions/start";

type Props = {
  navigation?: StackNavigationProp<RootStackParamList, "Detail">;
};

const StartButton: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => dispatch(setStarted(true))}
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
  },
  text: {
    fontWeight: "bold",
    color: Colors.boldText,
    fontSize: 16,
  },
});

export default StartButton;