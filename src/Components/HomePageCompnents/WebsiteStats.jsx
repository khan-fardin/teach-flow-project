import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useAxios from '../../hooks/useAxios';

const WebsiteStats = () => {
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
    <section className="py-16 px-4 bg-base-100 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 items-center gap-10">
        {/* Left: Stats Cards */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mb-4">Platform Overview</h2>

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
