import { SYMPTOM_CHECK_CLEAR, SYMPTOM_CHECK_FAILURE, SYMPTOM_CHECK_REQUEST, SYMPTOM_CHECK_SUCCESS } from "../../actionTypes/symptom/symptomActionTypes";

const initialState = {
    symptomCheckResult: null,
    symptomCheckLoading: false,
    error: null,
};

const symptomReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SYMPTOM_CHECK_REQUEST:
            return {
                ...state,
                symptomCheckResult: null,
                symptomCheckLoading: true,
                error: null,
            };
        case SYMPTOM_CHECK_SUCCESS:
            return {
                ...state,
                symptomCheckResult: action.payload,
                symptomCheckLoading: false,
                error: null,
            };
        case SYMPTOM_CHECK_FAILURE:
            return {
                ...state,
                symptomCheckResult: null,
                symptomCheckLoading: false,
                error: action.payload,
            };
        case SYMPTOM_CHECK_CLEAR:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default symptomReducer;
