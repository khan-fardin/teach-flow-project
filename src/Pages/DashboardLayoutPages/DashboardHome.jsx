import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const DashboardHome = () => {
    const axiosSecure = useAxios();

    const { data: stats = {}, loading } = useQuery({
        queryKey: ['website-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/website-stats');
            return res.data;
        }
    });

    return (
        <div>
            <div className="space-y-6 p-5">
                {loading ? (
                    <>
                        <Skeleton height={80} />
                        <Skeleton height={80} />
                        <Skeleton height={80} />
                    </>
                ) : (
                    <>
                        <div className="bg-primary text-primary-content p-6 rounded-xl shadow">
                            <h3 className="text-2xl font-semibold">👥 Total Users</h3>
                            <p className="text-3xl mt-2 font-bold">{stats.totalUsers}</p>
                        </div>

                        <div className="bg-secondary text-secondary-content p-6 rounded-xl shadow">
                            <h3 className="text-2xl font-semibold">📚 Total Classes</h3>
                            <p className="text-3xl mt-2 font-bold">{stats.totalClasses}</p>
                        </div>

                        <div className="bg-accent text-accent-content p-6 rounded-xl shadow">
                            <h3 className="text-2xl font-semibold">🎓 Total Enrollments</h3>
                            <p className="text-3xl mt-2 font-bold">{stats.totalEnrollments}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;