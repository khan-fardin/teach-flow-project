import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUser, FaEnvelope, FaUserShield } from 'react-icons/fa';
import { FaWatchmanMonitoring } from 'react-icons/fa6';

const Profile = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userData, isLoading: dataLoading } = useQuery({
        queryKey: ['userData', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${user.email}`);
            return res.data;
        },
    });

    if (dataLoading || loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner text-success text-4xl"></span>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-lg">
                    <FaUser className="text-primary" />
                    <span className="font-medium">Name:</span>
                    <span>{userData?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                    <FaEnvelope className="text-primary" />
                    <span className="font-medium">Email:</span>
                    <span>{userData?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                    <FaUserShield className="text-primary" />
                    <span className="font-medium">Role:</span>
                    <span className="capitalize">{userData?.role || 'user'}</span>
                </div>
            </div>
        </div>
    );
};

export default Profile;
