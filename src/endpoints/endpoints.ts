export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const ENDPOINTS = {
    SYMPTOM_CHECK: `${API_URL}/api/symptoms/check`,
    MEDICINE_LIST: `${API_URL}/api/medicines/list`,
    MEDICINE_ADD: `${API_URL}/api/medicines/add`,
    MEDICINE_UPDATE: `${API_URL}/api/medicines/update`,
    MEDICINE_DELETE: `${API_URL}/api/medicines/delete`,
    EMERGENCY_CONTACTS: `${API_URL}/api/emergency/contacts`,
};
