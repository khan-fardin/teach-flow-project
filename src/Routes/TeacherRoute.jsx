import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAdminCheck from '../hooks/useAdminCheck';

const TeacherRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { isAdmin, adminLoading } = useAdminCheck();
    const location = useLocation();

    if (loading || adminLoading) {
        return <div className="text-center py-10">Checking teacher access...</div>;
    }

    if (user && isAdmin === "teacher") {
        return children;
    }

    return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default TeacherRoute;
