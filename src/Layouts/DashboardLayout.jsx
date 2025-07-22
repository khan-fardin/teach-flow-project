import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Logo from '../Components/Shared/Logo';
import useAdminCheck from '../hooks/useAdminCheck';
import { FaBookOpen, FaShield, FaUser, FaUserSecret } from 'react-icons/fa6';
import { FaHome, FaPlusCircle } from 'react-icons/fa';
import { LuLayoutList } from "react-icons/lu";
import Loading from '../Pages/Loading';

const DashboardLayout = () => {
    const { isAdmin, adminLoading } = useAdminCheck();

    const links = (
        <>
            <li>
                <NavLink to="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-primary rounded-lg">
                    <FaHome className="w-5 h-5" /> Dashboard Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-primary rounded-lg">
                    <FaUser className="w-5 h-5" /> Profile
                </NavLink>
            </li>

            {!adminLoading && isAdmin === "admin" && (
                <>
                    <li>
                        <NavLink to="/dashboard/all-classes-admin" className="flex items-center gap-2 px-4 py-2 hover:bg-primary rounded-lg">
                            <FaBookOpen className="w-5 h-5" /> All Classes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/teacher-request" className="flex items-center gap-2 px-4 py-2 hover:bg-primary rounded-lg">
                            <FaUserSecret className="w-5 h-5" /> Pending Teacher Request
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/admin-role-manager" className="flex items-center gap-2 px-4 py-2 hover:bg-primary rounded-lg">
                            <FaShield className="w-5 h-5" /> Admin Role Manager
                        </NavLink>
                    </li>
                </>
            )}

            {!adminLoading && isAdmin === "teacher" && (
                <>
                    <li>
                        <NavLink to="/dashboard/add-class" className="flex items-center gap-2 px-4 py-2 hover:bg-primary rounded-lg">
                            <FaPlusCircle className="w-5 h-5" /> Add Class
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-classes" className="flex items-center gap-2 px-4 py-2 hover:bg-primary rounded-lg">
                            <LuLayoutList className="w-5 h-5" /> My Classes
                        </NavLink>
                    </li>
                </>
            )}

            {!adminLoading && isAdmin === "student" && (
                <>
                    <li>
                        <NavLink to="/dashboard/my-enrolled-classes" className="flex items-center gap-2 px-4 py-2 hover:bg-primary rounded-lg">
                            <LuLayoutList className="w-5 h-5" /> My Enrolled Classes
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    if (adminLoading) return <Loading />;

    return (
        <div className="min-h-screen flex">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Mobile Nav */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex-none">
                            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2"><Logo /></div>
                    </div>
                    <Outlet />
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-1">
                        <div className="hidden lg:block mb-4"><Logo /></div>
                        {links}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
