import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSymptomCheckRequest, fetchSymptomCheckClear } from "../redux/action/symptom/symptomAction";
import { FaCheckCircle, FaExclamationTriangle, FaTimes, FaStethoscope } from "react-icons/fa";

const SymptomChecker = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

    // Hardcoded common symptoms for quick selection
    const commonSymptoms = ["Fever", "Cough", "Headache", "Nausea", "Stomach ache", "Chest pain", "Shortness of breath"];

    const { symptomCheckResult, symptomCheckLoading } = useSelector((state: any) => state.symptom);

    const handleAddSymptom = (symptom: string) => {
        if (symptom.trim() && !selectedSymptoms.includes(symptom.trim())) {
            setSelectedSymptoms([...selectedSymptoms, symptom.trim()]);
        }
        setInputValue("");
    };

    const handleRemoveSymptom = (symptomToRemove: string) => {
        setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptomToRemove));
    };

    const handleCheck = () => {
        if (selectedSymptoms.length > 0) {
            dispatch(fetchSymptomCheckRequest(selectedSymptoms));
        }
    };

    const handleReset = () => {
        setSelectedSymptoms([]);
        dispatch(fetchSymptomCheckClear());
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <FaStethoscope className="text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">AI Symptom Checker</h1>
                        <p className="text-indigo-100 mt-1">Select your symptoms and our AI will predict possible illnesses.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">What are you feeling?</h2>

                    <div className="flex space-x-2 mb-6">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSymptom(inputValue)}
                            placeholder="Type a symptom..."
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                        <button
                            onClick={() => handleAddSymptom(inputValue)}
                            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Add
                        </button>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm text-slate-500 mb-3 font-medium">Common Symptoms:</p>
                        <div className="flex flex-wrap gap-2">
                            {commonSymptoms.map(symp => (
                                <button
                                    key={symp}
                                    onClick={() => handleAddSymptom(symp)}
                                    className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 text-sm rounded-lg transition-colors border border-slate-200"
                                >
                                    + {symp}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedSymptoms.length > 0 && (
                        <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                            <p className="text-sm text-indigo-800 font-bold mb-3">Selected Symptoms:</p>
                            <div className="flex flex-wrap gap-2">
                                {selectedSymptoms.map(symp => (
                                    <span key={symp} className="flex items-center px-3 py-1.5 bg-white text-indigo-700 font-medium text-sm rounded-lg shadow-sm border border-indigo-200">
                                        {symp}
                                        <button onClick={() => handleRemoveSymptom(symp)} className="ml-2 text-indigo-400 hover:text-red-500 transition-colors">
                                            <FaTimes />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={handleCheck}
                            disabled={selectedSymptoms.length === 0 || symptomCheckLoading}
                            className={`flex-1 py-3.5 rounded-xl font-bold shadow-sm transition-all ${selectedSymptoms.length === 0 || symptomCheckLoading
                                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-0.5"
                                }`}
                        >
                            {symptomCheckLoading ? "Analyzing..." : "Analyze Symptoms"}
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Diagnosis Results</h2>

                    {symptomCheckLoading ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                            <p className="animate-pulse">Consulting our medical AI model...</p>
                        </div>
                    ) : symptomCheckResult ? (
                        <div className="flex-1 animate-fade-in-up">
                            <div className={`p-5 rounded-2xl mb-6 ${symptomCheckResult.possibleIllness?.includes("URGENT")
                                ? "bg-red-50 border border-red-200"
                                : "bg-green-50 border border-green-200"
                                }`}>
                                <div className="flex items-center space-x-3 mb-2">
                                    {symptomCheckResult.possibleIllness?.includes("URGENT")
                                        ? <FaExclamationTriangle className="text-red-500 text-xl" />
                                        : <FaCheckCircle className="text-green-500 text-xl" />
                                    }
                                    <h3 className={`text-lg font-bold ${symptomCheckResult.possibleIllness?.includes("URGENT") ? "text-red-800" : "text-green-800"
                                        }`}>
                                        {symptomCheckResult.possibleIllness || "No specific illness detected"}
                                    </h3>
                                </div>
                                {symptomCheckResult.confidence && (
                                    <div className="mt-2 text-sm font-medium text-slate-500">
                                        AI Confidence: <span className="text-indigo-600">{symptomCheckResult.confidence}</span>
                                    </div>
                                )}
                            </div>

                            <h4 className="font-bold text-slate-700 mb-3">Recommended Precautions:</h4>
                            <ul className="space-y-3">
                                {symptomCheckResult.precautions?.map((prec: string, idx: number) => (
                                    <li key={idx} className="flex items-start space-x-3 text-slate-600">
                                        <div className="min-w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></div>
                                        <span>{prec}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-6">
                                <p className="text-xs text-slate-400 text-center italic">
                                    Disclaimer: This tool provides informational predictions and is not a substitute for professional medical advice.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <FaStethoscope className="text-3xl text-slate-300" />
                            </div>
                            <p>Add your symptoms and click Analyze to see possible results here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SymptomChecker;
