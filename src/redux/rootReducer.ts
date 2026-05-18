import { combineReducers } from "@reduxjs/toolkit";
import symptomReducer from "./reducer/symptom/symptomReducer";

const rootReducer = combineReducers({
    symptom: symptomReducer,
    // other reducers will go here
});

export default rootReducer;
