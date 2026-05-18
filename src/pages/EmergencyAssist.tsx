import { FaAmbulance, FaHospital, FaPhoneAlt, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../endpoints/endpoints";
import showToast from "../common-components/toastNotification";

const EmergencyAssist = () => {
    const [alertSent, setAlertSent] = useState(false);
    const [hospitals, setHospitals] = useState<any[]>([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(ENDPOINTS.EMERGENCY_CONTACTS);
                setHospitals(response.data);
            } catch (error) {
                console.error("Error fetching emergency contacts:", error);
            }
        };
        fetchContacts();
    }, []);

    const handleEmergencyAlert = () => {
        setAlertSent(true);
        showToast("Emergency Alert Sent Successfully! Help is on the way.", "success");
        setTimeout(() => setAlertSent(false), 5000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-red-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <FaAmbulance className="text-9xl" />
                </div>
                
                <div className="relative z-10 mb-6 md:mb-0 md:pr-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <FaExclamationTriangle className="text-red-200 text-2xl" />
                        <h1 className="text-3xl font-bold">Emergency Assistance</h1>
                    </div>
                    <p className="text-red-100 max-w-md">Immediate medical help and nearby hospital information. In case of severe emergency, directly call 911.</p>
                </div>

                <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
                    <button 
                        onClick={handleEmergencyAlert}
                        disabled={alertSent}
                        className={`w-full md:w-auto px-8 py-5 rounded-2xl font-black text-xl flex items-center justify-center space-x-3 transition-all ${
                            alertSent 
                            ? "bg-red-800 text-red-300 cursor-not-allowed" 
                            : "bg-white text-red-600 hover:bg-red-50 hover:shadow-lg transform hover:-translate-y-1 shadow-md shadow-red-900/20"
                        }`}
                    >
                        <FaPhoneAlt className={alertSent ? "" : "animate-pulse"} />
                        <span>{alertSent ? "ALERT SENT" : "SEND SOS ALERT"}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center">
                                <FaHospital className="text-indigo-500 mr-2" />
                                Nearby Hospitals
                            </h2>
                            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                                View Map
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {hospitals.map((hospital, idx) => (
                                <div key={idx} className="p-4 border border-slate-100 rounded-2xl hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-slate-50 text-slate-400 rounded-xl">
                                            <FaMapMarkerAlt className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">{hospital.name}</h3>
                                            <div className="flex items-center text-sm text-slate-500 mt-1 space-x-3">
                                                <span>{hospital.distance}</span>
                                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                <span className="text-indigo-600">Open 24/7</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors flex-1 sm:flex-none text-center">
                                            Directions
                                        </button>
                                        <button className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors flex-1 sm:flex-none text-center flex items-center justify-center">
                                            <FaPhoneAlt />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Emergency Contacts</h2>
                        <ul className="space-y-3">
                            <li className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">Am</div>
                                    <div>
                                        <p className="font-bold text-slate-800">Ambulance</p>
                                        <p className="text-xs text-slate-500">National</p>
                                    </div>
                                </div>
                                <a href="tel:911" className="p-2 bg-white rounded-lg shadow-sm text-green-600 hover:text-green-700 transition-colors">
                                    <FaPhoneAlt />
                                </a>
                            </li>
                            <li className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">Po</div>
                                    <div>
                                        <p className="font-bold text-slate-800">Police</p>
                                        <p className="text-xs text-slate-500">Local</p>
                                    </div>
                                </div>
                                <a href="tel:911" className="p-2 bg-white rounded-lg shadow-sm text-green-600 hover:text-green-700 transition-colors">
                                    <FaPhoneAlt />
                                </a>
                            </li>
                            <li className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">Jo</div>
                                    <div>
                                        <p className="font-bold text-slate-800">John Doe (Husband)</p>
                                        <p className="text-xs text-slate-500">Primary Contact</p>
                                    </div>
                                </div>
                                <a href="tel:+1234567890" className="p-2 bg-white rounded-lg shadow-sm text-green-600 hover:text-green-700 transition-colors">
                                    <FaPhoneAlt />
                                </a>
                            </li>
                        </ul>
                        <button className="w-full mt-4 py-2 border border-dashed border-slate-300 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                            + Add Contact
                        </button>
                    </div>

                    <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100">
                        <h3 className="font-bold text-orange-800 mb-2">First Aid Quick Tips</h3>
                        <p className="text-sm text-orange-700 mb-3">Learn basic life-saving steps while waiting for help.</p>
                        <button className="w-full py-2 bg-orange-200 text-orange-800 font-bold rounded-xl hover:bg-orange-300 transition-colors">
                            View Guide
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyAssist;
