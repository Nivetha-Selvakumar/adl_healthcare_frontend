import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../endpoints/endpoints";
import { FaPlus, FaPills, FaClock, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

interface Medicine {
    id: number;
    name: string;
    time: string;
    status: string; // 'Taken' or 'Pending'
}

const MedicineReminder = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newMedName, setNewMedName] = useState("");
    const [newMedTime, setNewMedTime] = useState("");

    const fetchMedicines = async () => {
        try {
            const response = await axios.get(ENDPOINTS.MEDICINE_LIST);
            setMedicines(response.data);
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const handleAddMedicine = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMedName && newMedTime) {
            try {
                const response = await axios.post(ENDPOINTS.MEDICINE_ADD, {
                    name: newMedName,
                    time: newMedTime,
                    dosage: "1 dose", // Default since UI doesn't have it
                    status: "Pending"
                });
                setMedicines([...medicines, response.data]);
                setNewMedName("");
                setNewMedTime("");
                setShowForm(false);
            } catch (error) {
                console.error("Error adding medicine:", error);
            }
        }
    };

    const toggleTaken = async (id: number) => {
        const med = medicines.find(m => m.id === id);
        if (!med) return;
        
        const newStatus = med.status === "Taken" ? "Pending" : "Taken";
        try {
            await axios.put(`${ENDPOINTS.MEDICINE_UPDATE}/${id}`, { status: newStatus });
            setMedicines(medicines.map(m => 
                m.id === id ? { ...m, status: newStatus } : m
            ));
        } catch (error) {
            console.error("Error updating medicine:", error);
        }
    };

    const removeMedicine = async (id: number) => {
        try {
            await axios.delete(`${ENDPOINTS.MEDICINE_DELETE}/${id}`);
            setMedicines(medicines.filter(med => med.id !== id));
        } catch (error) {
            console.error("Error deleting medicine:", error);
        }
    };

    // Sort: upcoming first, taken later, and ordered by time
    const sortedMedicines = [...medicines].sort((a, b) => {
        const aTaken = a.status === "Taken";
        const bTaken = b.status === "Taken";
        if (aTaken === bTaken) {
            return a.time.localeCompare(b.time);
        }
        return aTaken ? 1 : -1;
    });

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100 gap-4">
                <div className="flex items-center space-x-4">
                    <div className="p-4 bg-teal-50 text-teal-500 rounded-2xl">
                        <FaPills className="text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Medicine Reminders</h1>
                        <p className="text-slate-500 text-sm mt-1">Keep track of your daily medications.</p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors shadow-sm"
                >
                    <FaPlus />
                    <span>Add Medicine</span>
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 animate-fade-in-up">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Reminder</h2>
                    <form onSubmit={handleAddMedicine} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Medicine Name</label>
                            <input 
                                type="text" 
                                required
                                value={newMedName}
                                onChange={(e) => setNewMedName(e.target.value)}
                                placeholder="e.g. Amoxicillin" 
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                            <input 
                                type="time" 
                                required
                                value={newMedTime}
                                onChange={(e) => setNewMedTime(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all text-slate-700"
                            />
                        </div>
                        <div className="md:col-span-1 flex items-end">
                            <button type="submit" className="w-full py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors shadow-sm">
                                Save Reminder
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800">Your Schedule</h2>
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">
                        {medicines.filter(m => m.status !== "Taken").length} remaining
                    </span>
                </div>
                
                {medicines.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                        <FaPills className="text-4xl mx-auto text-slate-300 mb-3" />
                        <p>No medicines added yet.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {sortedMedicines.map((med) => (
                            <div key={med.id} className={`p-6 flex items-center justify-between transition-colors hover:bg-slate-50 ${med.status === 'Taken' ? 'opacity-60 bg-slate-50' : ''}`}>
                                <div className="flex items-center space-x-4">
                                    <button 
                                        onClick={() => toggleTaken(med.id)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                                            med.status === 'Taken' 
                                            ? 'bg-teal-100 text-teal-500' 
                                            : 'bg-slate-100 text-slate-400 hover:bg-teal-50 hover:text-teal-400 border border-slate-200'
                                        }`}
                                    >
                                        <FaCheckCircle className="text-2xl" />
                                    </button>
                                    <div>
                                        <h3 className={`text-lg font-bold ${med.status === 'Taken' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                            {med.name}
                                        </h3>
                                        <div className="flex items-center text-slate-500 text-sm mt-1">
                                            <FaClock className="mr-1.5" />
                                            <span>{med.time}</span>
                                            {med.status === 'Taken' && <span className="ml-3 text-teal-600 font-medium text-xs">Taken</span>}
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeMedicine(med.id)}
                                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    title="Delete"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicineReminder;
