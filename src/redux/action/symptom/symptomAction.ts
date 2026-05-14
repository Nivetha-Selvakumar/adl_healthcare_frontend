import { SYMPTOM_CHECK_CLEAR, SYMPTOM_CHECK_FAILURE, SYMPTOM_CHECK_REQUEST, SYMPTOM_CHECK_SUCCESS } from "../../actionTypes/symptom/symptomActionTypes";

export const fetchSymptomCheckRequest = (payload: any) => ({
    type: SYMPTOM_CHECK_REQUEST,
    payload: payload,
});

export const fetchSymptomCheckSuccess = (data: any) => ({
    type: SYMPTOM_CHECK_SUCCESS,
    payload: data,
});

export const fetchSymptomCheckFailure = (error: any) => ({
    type: SYMPTOM_CHECK_FAILURE,
    payload: error,
});

export const fetchSymptomCheckClear = () => ({
    type: SYMPTOM_CHECK_CLEAR,
});
