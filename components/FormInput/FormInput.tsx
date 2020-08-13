import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const FormInput: React.FC<Props> = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={(text: string) => props.setValue(text)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#eee",
    width: 260,
    height: 44,
    marginVertical: 4,
    fontSize: 16,
  },
});

export default FormInput;
