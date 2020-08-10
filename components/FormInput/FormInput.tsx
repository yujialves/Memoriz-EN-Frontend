import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

type Props = {
  placeholder: string;
};

const FormInput: React.FC<Props> = (props) => {
  return <TextInput style={styles.input} placeholder={props.placeholder} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#eee",
    width: Dimensions.get("window").width * 0.7,
    height: 44,
    marginVertical: 4,
    fontSize: 16
  },
});

export default FormInput;
