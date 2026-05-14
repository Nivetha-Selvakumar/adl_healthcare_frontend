import { all, fork } from "redux-saga/effects";
import { watchSymptomCheck } from "./saga/symptom/symptomSaga";

export default function* rootSaga() {
    yield all([
        fork(watchSymptomCheck),
        // other sagas will go here
    ]);
}
