import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { Question } from "../../store/questionList/questionList.reducer";
import { useDispatch, useSelector } from "react-redux";
import * as questionListAction from "../../store/questionList/questionList.action";

const OrderController: React.FC = () => {
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state: { questionList: { questionList: Question[] } }) =>
      state.questionList.questionList
  );

  const [currentOrder, setCurrentOrder] = useState(
    "id" as "id" | "alphabet" | "grade"
  );
  const [reversed, setReversed] = useState(false);

  const onPressReverseHandler = () => {
    dispatch(
      questionListAction.reorder(questionList, currentOrder, !reversed)
    );
    setReversed(!reversed);
  };

  const onPressIdHandler = () => {
    dispatch(questionListAction.reorder(questionList, "id", reversed));
    setCurrentOrder("id");
  };

  const onPressAlphaHandler = () => {
    dispatch(
      questionListAction.reorder(questionList, "alphabet", reversed)
    );
    setCurrentOrder("alphabet");
  };

  const onPressGradeHandler = () => {
    dispatch(questionListAction.reorder(questionList, "grade", reversed));
    setCurrentOrder("grade");
  };

  return (
    <View style={styles.container}>
      <View style={styles.segmentController}>
        <TouchableOpacity
          style={{
            ...buttonStyle,
            ...leftButton,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: currentOrder === "id" ? Colors.primary : "white",
          }}
          activeOpacity={0.7}
          onPress={onPressIdHandler}
        >
          <Text
            style={{
              ...textStyle,
              color: currentOrder === "id" ? "white" : Colors.boldText,
            }}
          >
            ID順
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...buttonStyle,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              currentOrder === "alphabet" ? Colors.primary : "white",
          }}
          activeOpacity={0.7}
          onPress={onPressAlphaHandler}
        >
          <Text
            style={{
              ...textStyle,
              color: currentOrder === "alphabet" ? "white" : Colors.boldText,
            }}
          >
            名前順
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...buttonStyle,
            ...rightButton,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: currentOrder === "grade" ? Colors.primary : "white",
          }}
          activeOpacity={0.7}
          onPress={onPressGradeHandler}
        >
          <Text
            style={{
              ...textStyle,
              color: currentOrder === "grade" ? "white" : Colors.boldText,
            }}
          >
            グレード順
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          ...orderButton,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: reversed ? Colors.primary : "white",
        }}
        activeOpacity={0.7}
        onPress={onPressReverseHandler}
      >
        <Text
          style={{
            ...textStyle,
            color: reversed ? "white" : Colors.boldText,
          }}
        >
          {reversed ? "降順" : "昇順"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const textStyle = {
  fontSize: 12,
};

const buttonStyle = {
  height: 30,
  width: 88,
  borderWidth: 2,
  borderColor: Colors.primary,
  shadowColor: "black",
  shadowRadius: 8,
  shadowOpacity: 0.05,
};

const orderButton = {
  ...buttonStyle,
  width: 44,
  borderRadius: 10,
};

const leftButton = {
  borderRightWidth: 0,
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
};

const centerButton = {};

const rightButton = {
  borderLeftWidth: 0,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },
  segmentController: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderController;
