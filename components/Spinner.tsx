import React from "react";
import { View, StyleSheet, Image } from "react-native";

type Props = {
  height: number;
  width: number;
};

const Spinner: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ height: props.height, width: props.width }}
        source={require("../assets/spinner.gif")}
        data-test="spinner"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spinner;
