import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useEffect } from 'react';

const DashboardHome = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxios();

    useEffect(() => {
        // For now use demo data, switch to axios later
        // const demoStats = {
        //   totalUsers: 120,
        //   totalClasses: 25,
        //   totalEnrollments: 230
        // };
        // setTimeout(() => {
        //   setStats(demoStats);
        //   setLoading(false);
        // }, 1000);

        // Later replace this:
        axiosSecure.get('/website-stats')
            .then(res => setStats(res.data))
            .finally(() => setLoading(false));
    }, [axiosSecure]);
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