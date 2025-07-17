import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();

    // fetch all teacher requests
    const { data: requests = [], refetch, isLoading } = useQuery({
        queryKey: ['teacher-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teacher-requests'); // You need to add this route in backend
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
        <div className="overflow-x-auto mt-10 p-5">
            <h2 className="text-2xl font-bold text-center mb-6">Teacher Requests</h2>
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
                                <img src={request.image} alt="user" className="w-12 h-12 rounded-full object-cover" />
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
                                    disabled={request.status === 'approved' || request.status === 'rejected'}
                                >
                                    <FaCheck />
                                </button>
                                <button
                                    className="btn btn-sm btn-error tooltip"
                                    data-tip="Reject"
                                    onClick={() => handleStatusUpdate(request._id, 'rejected')}
                                    disabled={request.status === 'approved' || request.status === 'rejected'}
                                >
                                    <FaTimes />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherRequest;
