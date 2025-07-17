import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllClassesAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery({
    queryKey: ['all-classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/classes'); // All classes including pending
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">All Classes (Admin Panel)</h2>
      <div className="overflow-x-auto">
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
                <td><img src={cls.image} alt="class" className="w-16 h-16 object-cover rounded" /></td>
                <td>{cls.title}</td>
                <td>{cls.teacherEmail}</td>
                <td>{cls.description?.slice(0, 40)}...</td>
                <td>
                  <span className={`badge ${cls.status === 'approved' ? 'badge-success' : cls.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                    {cls.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleStatusUpdate(cls._id, 'approved')}
                    disabled={cls.status === 'approved' || cls.status === 'rejected'}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleStatusUpdate(cls._id, 'rejected')}
                    disabled={cls.status === 'rejected' || cls.status === 'approved'}
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/class-progress/${cls._id}`}>
                    <button
                      className="btn btn-sm btn-outline"
                      disabled={cls.status !== 'approved'}
                    >
                      Progress
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClassesAdmin;
