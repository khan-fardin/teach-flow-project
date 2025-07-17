import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTeacherCheck = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isTeacher, isLoading: adminLoading, refetch } = useQuery({
        queryKey: ['isTeacher', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user.email}`);
            return res.data.role;
        },
    });

    return { refetch, isTeacher, adminLoading };
};

export default useTeacherCheck;