import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigation from "./navigations/HomeNavigation/HomeNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import subjectsReducer from "./store/reducers/subjectsReducer";

const rootReducer = combineReducers({
  subjects: subjectsReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeNavigation />
      </NavigationContainer>
    </Provider>
  );
}
