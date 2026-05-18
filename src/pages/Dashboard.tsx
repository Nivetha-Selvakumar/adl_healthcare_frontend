import { FaHeartbeat, FaStethoscope, FaPills, FaAmbulance } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const stats = [
        { title: "Health Score", value: "85/100", icon: <FaHeartbeat className="text-red-500" />, bg: "bg-red-50" },
        { title: "Upcoming Reminders", value: "3", icon: <FaPills className="text-blue-500" />, bg: "bg-blue-50" },
        { title: "Recent Checks", value: "2", icon: <FaStethoscope className="text-green-500" />, bg: "bg-green-50" },
        { title: "Emergency Contacts", value: "5", icon: <FaAmbulance className="text-orange-500" />, bg: "bg-orange-50" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back, Jane! 👋</h1>
                <p className="text-slate-500 mt-1">Here is your health overview for today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-xl ${stat.bg} text-2xl`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/symptom-checker" className="group p-5 bg-indigo-50 rounded-xl hover:bg-indigo-600 transition-colors duration-300">
                            <FaStethoscope className="text-3xl text-indigo-500 group-hover:text-white mb-3 transition-colors" />
                            <h3 className="text-lg font-bold text-indigo-900 group-hover:text-white transition-colors">Check Symptoms</h3>
                            <p className="text-sm text-indigo-600/80 group-hover:text-indigo-100 transition-colors mt-1">AI-powered diagnosis prediction</p>
                        </Link>
                        <Link to="/medicine-reminder" className="group p-5 bg-teal-50 rounded-xl hover:bg-teal-600 transition-colors duration-300">
                            <FaPills className="text-3xl text-teal-500 group-hover:text-white mb-3 transition-colors" />
                            <h3 className="text-lg font-bold text-teal-900 group-hover:text-white transition-colors">Medicine Reminders</h3>
                            <p className="text-sm text-teal-600/80 group-hover:text-teal-100 transition-colors mt-1">Never miss your medications</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Upcoming Schedule</h2>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                            <div>
                                <p className="font-bold text-slate-800">Paracetamol (500mg)</p>
                                <p className="text-sm text-slate-500">After Lunch • 2:00 PM</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <div className="w-2 h-2 mt-2 rounded-full bg-red-500"></div>
                            <div>
                                <p className="font-bold text-slate-800">Vitamin C</p>
                                <p className="text-sm text-slate-500">With Breakfast • 9:00 AM</p>
                            </div>
                        </div>
                    </div>
                    <button className="mt-6 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                        View All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
