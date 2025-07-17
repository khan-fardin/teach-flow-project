import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/MainLayoutPages/Home";
import AllClasses from "../Pages/MainLayoutPages/AllClasses";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/DashboardLayoutPages/DashboardHome";
import PrivateRoute from "../Routes/PrivateRoute";
import AdminRoleManager from "../Pages/DashboardLayoutPages/AdminRoleManager";
import BeATeacher from "../Pages/MainLayoutPages/BeATeacher";
import TeacherRequest from "../Pages/DashboardLayoutPages/TeacherRequest";
import AddClass from "../Pages/DashboardLayoutPages/AddClass";
import MyClasses from "../Pages/DashboardLayoutPages/MyClasses";
import AdminRoute from "../Routes/AdminRoute";
import AllClassesAdmin from "../Pages/DashboardLayoutPages/AllClassesAdmin";
import MyClassDetails from "../Pages/DashboardLayoutPages/MyClassDetails";
import Profile from "../Pages/DashboardLayoutPages/Profile";
import ClassDetails from "../Pages/MainLayoutPages/ClassDetails";
import Payment from "../Pages/MainLayoutPages/Payment";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                path: '/',
                Component: Home,
            },
            {
                path: '/all-classes',
                Component: AllClasses,
            },
            {
                path: '/class-details/:id',
                element: <PrivateRoute>
                    <ClassDetails />
                </PrivateRoute>,
            },
            {
                path: 'payment/:parcelId',
                Component: Payment,
            },
            {
                path: '/be-a-teacher',
                element: <PrivateRoute>
                    <BeATeacher />
                </PrivateRoute>,
            },
        ],
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                Component: DashboardHome,
            },
            {
                path: 'teacher-request',
                element: <AdminRoute>
                    <TeacherRequest />
                </AdminRoute>,
            },
            {
                path: 'admin-role-manager',
                element: <AdminRoute>
                    <AdminRoleManager />
                </AdminRoute>,
            },
            {
                path: 'all-classes-admin',
                element: <AdminRoute>
                    <AllClassesAdmin />
                </AdminRoute>,
            },
            {
                path: 'add-class',
                Component: AddClass,
            },
            {
                path: 'my-classes',
                Component: MyClasses,
            },
            {
                path: 'my-class/:id',
                Component: MyClassDetails,
            },
            {
                path: 'profile',
                Component: Profile,
            },
        ],
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/register',
        Component: Register,
    },
]);