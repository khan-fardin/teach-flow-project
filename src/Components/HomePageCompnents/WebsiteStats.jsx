import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const WebsiteStats = () => {
  const axiosSecure = useAxios();

  const { data: stats = {}, loading } = useQuery({
    queryKey: ['website-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/website-stats');
      return res.data;
    }
  });

  return (
    <section className="py-16 px-4 bg-base-100 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Platform Overview</h2>
      <div className="grid md:grid-cols-2 items-center gap-10">
        {/* Left: Stats Cards */}
        <div className="space-y-6">
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

        {/* Right: Image */}
        <div>
          <img
            src="https://img.freepik.com/premium-vector/learning-concept-illustration_114360-6186.jpg?w=826"
            alt="Students Learning"
            className="w-full max-w-md mx-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WebsiteStats;
