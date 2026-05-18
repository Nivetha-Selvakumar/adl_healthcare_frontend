import { NavLink } from "react-router-dom";
import { FaHeartbeat, FaStethoscope, FaPills, FaAmbulance, FaBars } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: <FaHeartbeat /> },
        { name: "Symptom Checker", path: "/symptom-checker", icon: <FaStethoscope /> },
        { name: "Medicine Reminder", path: "/medicine-reminder", icon: <FaPills /> },
        { name: "Emergency Assist", path: "/emergency-assist", icon: <FaAmbulance /> },
    ];

    return (
        <div className={`flex flex-col bg-white border-r border-slate-200 h-screen transition-all duration-300 z-20 shadow-sm ${isOpen ? "w-64" : "w-20"}`}>
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
                {isOpen && (
                    <div className="flex items-center space-x-2 text-indigo-600">
                        <FaHeartbeat className="text-2xl" />
                        <span className="text-xl font-bold tracking-tight">MediAssist</span>
                    </div>
                )}
                <button 
                    onClick={toggleSidebar} 
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors mx-auto"
                >
                    <FaBars className="text-xl" />
                </button>
            </div>
            
            <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                                isActive 
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" 
                                : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                            }`
                        }
                    >
                        <div className="text-xl flex-shrink-0">
                            {item.icon}
                        </div>
                        {isOpen && <span className="font-medium whitespace-nowrap">{item.name}</span>}
                        
                        {/* Tooltip for collapsed state */}
                        {!isOpen && (
                            <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                {item.name}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>
            
            {isOpen && (
                <div className="p-4 m-4 bg-indigo-50 rounded-2xl">
                    <p className="text-sm text-indigo-800 font-medium mb-2">Need Help?</p>
                    <p className="text-xs text-indigo-600/80 mb-3">Contact support or access FAQs.</p>
                    <button className="w-full py-2 bg-white text-indigo-600 text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        Support
                    </button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
