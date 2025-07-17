import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], refetch, isLoading } = useQuery({
        queryKey: ['teacher-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teacher-requests');
            return res.data;
        }
    });

    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await axiosSecure.patch(`/update-status/${id}`, { status });
            if (res.data.modifiedCount > 0 || res.data.acknowledged) {
                toast.success(`Request ${status}`);
                refetch();
            }
        } catch (error) {
            toast.error("Failed to update status.");
        }
    };

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="mt-10 p-5">
            <h2 className="text-2xl font-bold text-center mb-6">Teacher Requests</h2>

            {/* Table for large screens */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Experience</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={request._id}>
                                <td>{index + 1}</td>
                                <td>{request.name}</td>
                                <td>
                                    <img src={request.image || "https://img.freepik.com/premium-psd/3d-user-icon-with-transparent-background_643365-335.jpg?w=826"} alt="user" className="w-12 h-12 rounded-full object-cover" />
                                </td>
                                <td>{request.experience}</td>
                                <td>{request.title}</td>
                                <td>{request.category}</td>
                                <td>
                                    <span className={`badge ${request.status === 'approved'
                                        ? 'badge-success'
                                        : request.status === 'rejected'
                                            ? 'badge-error'
                                            : 'badge-warning'
                                        }`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-success tooltip"
                                        data-tip="Approve"
                                        onClick={() => handleStatusUpdate(request._id, 'approved')}
                                        disabled={request.status !== 'pending'}
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error tooltip"
                                        data-tip="Reject"
                                        onClick={() => handleStatusUpdate(request._id, 'rejected')}
                                        disabled={request.status !== 'pending'}
                                    >
                                        <FaTimes />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card layout for medium and small screens */}
            <div className="grid gap-4 lg:hidden">
                {requests.map((request) => (
                    <div key={request._id} className="card bg-base-200 shadow-md p-4 rounded-xl">
                        <div className="flex items-center gap-4">
                            <img src={request.image || "https://img.freepik.com/premium-psd/3d-user-icon-with-transparent-background_643365-335.jpg?w=826"} alt="user" className="w-14 h-14 rounded-full object-cover" />
                            <div>
                                <h3 className="font-bold text-lg">{request.name}</h3>
                                <p className="text-sm text-gray-500">{request.title}</p>
                                <span className={`badge mt-1 ${request.status === 'approved'
                                    ? 'badge-success'
                                    : request.status === 'rejected'
                                        ? 'badge-error'
                                        : 'badge-warning'
                                    }`}>
                                    {request.status}
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 text-sm">
                            <p><strong>Experience:</strong> {request.experience}</p>
                            <p><strong>Category:</strong> {request.category}</p>
                        </div>

                        <div className="flex gap-3 mt-4 justify-end">
                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => handleStatusUpdate(request._id, 'approved')}
                                disabled={request.status !== 'pending'}
                            >
                                <FaCheck className="mr-1" /> Approve
                            </button>
                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => handleStatusUpdate(request._id, 'rejected')}
                                disabled={request.status !== 'pending'}
                            >
                                <FaTimes className="mr-1" /> Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherRequest;
