import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userData, isLoading: dataLoading, refetch } = useQuery({
        queryKey: ['userData', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${user.email}`);
            return res.data;
        },
    });console.log(userData)

    if(dataLoading) return <>Loading....</>

    return (
        <div>
            <h1>{userData.name}</h1>
            <h1>{userData.email}</h1>
            <h1>{userData.role}</h1>
        </div>
    );
};

export default Profile;