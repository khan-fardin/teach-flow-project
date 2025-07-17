import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdminCheck = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isLoading: adminLoading, refetch } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user.email}`);
            return res.data.role;
        },
    });

    return { refetch, isAdmin, adminLoading };
};

export default useAdminCheck;