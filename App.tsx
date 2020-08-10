import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import InitNavigation from "./navigations/InitNavigation/InitNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import subjectsReducer from "./store/reducers/subjectsReducer";
import startReducer from "./store/reducers/startReducer";
import questionReducer from "./store/reducers/questionReducer";
import loadingsReducer from "./store/reducers/loadingsReducer";
import userReducer from "./store/reducers/userReducer";

const rootReducer = combineReducers({
  subjects: subjectsReducer,
  start: startReducer,
  question: questionReducer,
  loadings: loadingsReducer,
  user: userReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <InitNavigation />
      </NavigationContainer>
    </Provider>
  );
}
