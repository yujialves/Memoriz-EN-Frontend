import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import InitNavigation from "./navigations/InitNavigation/InitNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./store/root.saga";
import subjectsReducer from "./store/subjects/subjects.reducer";
import startReducer from "./store/start/start.reducer";
import questionReducer from "./store/question/question.reducer";
import loadingsReducer from "./store/loadings/loadings.reducer";
import authReducer from "./store/auth/auth.reducer";
import questionListReducer from "./store/questionList/questionList.reducer";

const rootReducer = combineReducers({
  subjects: subjectsReducer,
  start: startReducer,
  question: questionReducer,
  loadings: loadingsReducer,
  auth: authReducer,
  questionList: questionListReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(ReduxThunk, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <InitNavigation />
      </NavigationContainer>
    </Provider>
  );
}
