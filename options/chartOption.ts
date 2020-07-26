import Colors from "../constants/Colors";

export default {
  chart: {
    type: "bar",
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "G0",
      "G1",
      "G2",
      "G3",
      "G4",
      "G5",
      "G6",
      "G7",
      "G8",
      "G9",
      "G10",
      "G11",
      "G12",
    ],
    labels: {
      rotate: 310,
      rotateAlways: true,
      style: {
        colors: Colors.boldText,
        fontSize: 12,
        fontWeight: "bold",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: Colors.boldText,
        fontSize: 12,
        fontWeight: "bold",
      },
    },
  },
  legend: {
    show: false,
  },
};
