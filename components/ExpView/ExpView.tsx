import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

type Props = {
  exp: number;
};

const ExpView: React.FC<Props> = (props) => {
  const rest =
    ("0" + props.exp).slice(-2) === "00"
      ? 100
      : 100 - Number.parseInt(("0" + props.exp).slice(-2));

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.exp}>{Math.floor(props.exp / 100)}</Text>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.restLabel}>レベルアップまで残り{rest}問</Text>
        <View style={styles.progress}>
          <View
            style={{
              ...filter,
              width: `${100 - rest}%`,
            }}
          ></View>
        </View>
      </View>
    </View>
  );
};

const filter = {
  height: "100%",
  backgroundColor: Colors.accent,
  borderRadius: 50,
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  circle: {
    backgroundColor: "#f6f6f6",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  exp: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#555",
  },
  progressContainer: {
    width: Dimensions.get("window").width - 112,
    alignItems: "flex-end",
  },
  restLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
  },
  progress: {
    height: 12,
    width: Dimensions.get("window").width - 112,
    backgroundColor: "#ddd",
    borderRadius: 50,
    marginVertical: 4
  },
});

export default ExpView;
