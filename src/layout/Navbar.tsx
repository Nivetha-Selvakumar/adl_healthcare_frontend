import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

const Navbar = () => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-6 z-10">
            <div className="flex items-center bg-slate-100 px-4 py-2 rounded-full w-96 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:bg-white transition-all">
                <FaSearch className="text-slate-400 mr-3" />
                <input 
                    type="text" 
                    placeholder="Search medical records, symptoms..." 
                    className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder-slate-400"
                />
            </div>
            
            <div className="flex items-center space-x-6">
                <button className="relative text-slate-500 hover:text-indigo-600 transition-colors">
                    <FaBell className="text-xl" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </button>
                <div className="flex items-center space-x-3 cursor-pointer group">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Jane Doe</p>
                        <p className="text-xs text-slate-500">Patient</p>
                    </div>
                    <FaUserCircle className="text-3xl text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
