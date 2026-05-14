import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
