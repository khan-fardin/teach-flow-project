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
import Test from "../Pages/Test";
import MyEnrolledClasses from "../Pages/DashboardLayoutPages/MyEnrolledClasses";
import MyEnrolledClassDetail from "../Pages/DashboardLayoutPages/MyEnrolledClassDetail";
import TeacherRoute from "../Routes/TeacherRoute";
import Loading from "../Pages/Loading";
import ErrorPage from "../Pages/ErrorPage";
import ClassProgressAdmin from "../Pages/DashboardLayoutPages/ClassProgressAdmin";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        hydrateFallbackElement: <Loading />,
        errorElement: <ErrorPage />,
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
                path: 'payment/:classId',
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
        hydrateFallbackElement: <Loading />,
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
                path: 'class-progress-admin/:id',
                element: <AdminRoute>
                    <ClassProgressAdmin />
                </AdminRoute>,
            },
            {
                path: 'add-class',
                element: <TeacherRoute>
                    <AddClass />
                </TeacherRoute>,
            },
            {
                path: 'my-classes',
                element: <TeacherRoute>
                    <MyClasses />
                </TeacherRoute>,
            },
            {
                path: 'my-class/:id',
                Component: MyClassDetails,
            },
            {
                path: 'profile',
                Component: Profile,
            },
            {
                path: 'my-enrolled-classes',
                element: <MyEnrolledClasses />,
            },
            {
                path: 'my-enrolled-class/:id',
                element: <MyEnrolledClassDetail />,
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
    {
        path: '/test',
        Component: Test,
    },
]);