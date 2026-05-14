import { call, put, takeLeading, delay } from "redux-saga/effects";
import showToast from "../../../common-components/toastNotification";
import { SYMPTOM_CHECK_REQUEST } from "../../actionTypes/symptom/symptomActionTypes";
import { fetchSymptomCheckFailure, fetchSymptomCheckSuccess } from "../../action/symptom/symptomAction";

import axios from "axios";
import { ENDPOINTS } from "../../../endpoints/endpoints";

function* symptomCheckSaga(action: any): Generator<any, void, any> {
    try {
        const payload = action.payload; // array of symptoms
        
        const response = yield call(axios.post, ENDPOINTS.SYMPTOM_CHECK, { symptoms: payload });
        const responseData = {
            possibleIllness: response.data.illness,
            precautions: response.data.suggestions
        };

        yield put(fetchSymptomCheckSuccess(responseData));
    } catch (error: any) {
        yield put(fetchSymptomCheckFailure(error.message));
        showToast(error.message || "An unexpected error occurred", "error", "Symptom-Check");
    }
}

export function* watchSymptomCheck() {
    yield takeLeading(SYMPTOM_CHECK_REQUEST, symptomCheckSaga);
}
