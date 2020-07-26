import React from "react";
import { View, Text, StyleSheet } from "react-native";

const QuestionScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>QuestionScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default QuestionScreen;
