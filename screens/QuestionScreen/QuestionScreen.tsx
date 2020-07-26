import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import HeaderController from "../../components/HeaderController/HeaderController";
import { useDispatch } from "react-redux";

const QuestionScreen: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
  return (
    <View style={styles.screen}>
      <HeaderController subject="aaaaaa" grade="G100" />
      <View>{}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default QuestionScreen;
