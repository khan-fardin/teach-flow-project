import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../Loading';

const AllClassesAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: classes = [], isLoading, refetch } = useQuery({
    queryKey: ['all-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/classes');
      return res.data;
    }
  });

  const handleStatusUpdate = async (id, status) => {
    const result = await Swal.fire({
      title: `${status === 'approved' ? 'Approve' : 'Reject'} this class?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/classes/update-status/${id}`, { status });
        if (res.data.modifiedCount > 0) {
          toast.success(`Class ${status} successfully`);
          refetch();
        }
      } catch (err) {
        toast.error("Failed to update status");
      }
    }
  };

  const handleProgress = (id) => {
    navigate(`/dashboard/class-progress-admin/${id}`)
  };

  if (isLoading) return <Loading />

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">All Classes (Admin Panel)</h2>

      {/* Large screen table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(cls => (
              <tr key={cls._id}>
                <td>
                  <img
                    src={cls.image}
                    alt="class"
                    className="w-16 h-16 object-cover rounded border"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/64")}
                  />
                </td>
                <td>{cls.title}</td>
                <td>{cls.teacherEmail}</td>
                <td>{cls.description?.length > 40 ? `${cls.description.slice(0, 40)}...` : cls.description}</td>
                <td>
                  <span className={`badge capitalize ${cls.status === 'approved'
                    ? 'badge-success'
                    : cls.status === 'rejected'
                      ? 'badge-error'
                      : 'badge-warning'
                    }`}>
                    {cls.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleStatusUpdate(cls._id, 'approved')}
                    disabled={cls.status !== 'pending'}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleStatusUpdate(cls._id, 'rejected')}
                    disabled={cls.status !== 'pending'}
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline"
                    disabled={cls.status !== 'approved'}
                    onClick={() => handleProgress(cls._id)}
                  >
                    Progress
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {classes.map(cls => (
          <div key={cls._id} className="card bg-base-100 shadow-md">
            <figure className="p-4">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-40 object-cover rounded-md"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="text-lg font-semibold">{cls.title}</h2>
              <p className="text-sm text-gray-500">{cls.teacherEmail}</p>
              <p className="text-sm">{cls.description?.slice(0, 60)}...</p>
              <div className="mt-2">
                <span className={`badge capitalize ${cls.status === 'approved'
                  ? 'badge-success'
                  : cls.status === 'rejected'
                    ? 'badge-error'
                    : 'badge-warning'
                  }`}>
                  {cls.status}
                </span>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleStatusUpdate(cls._id, 'approved')}
                  disabled={cls.status !== 'pending'}
                >
                  Approve
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleStatusUpdate(cls._id, 'rejected')}
                  disabled={cls.status !== 'pending'}
                >
                  Reject
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  disabled={cls.status !== 'approved'}
                  onClick={() => handleProgress(cls._id)}
                >
                  Progress
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClassesAdmin;
