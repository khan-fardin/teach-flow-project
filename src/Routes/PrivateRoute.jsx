import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../Pages/Loading';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;