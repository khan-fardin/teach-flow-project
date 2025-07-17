import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAdminCheck from '../hooks/useAdminCheck';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { isAdmin, adminLoading } = useAdminCheck();
    const location = useLocation();

    if (loading || adminLoading) {
        return <div className="text-center py-10">Checking admin access...</div>;
    }

    if (user && isAdmin === "admin") {
        return children;
    }

    return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default AdminRoute;
