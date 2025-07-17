import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const MyClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: myClasses = [], refetch, isLoading } = useQuery({
        queryKey: ['my-classes', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/teacher?email=${user.email}`);
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This class will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/classes/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Class deleted successfully");
                    refetch();
                }
            } catch (error) {
                toast.error("Failed to delete class");
            }
        }
    };

    const handleUpdate = (id) => {
        // Redirect to update route or open modal here
        // You can use navigate(`/dashboard/update-class/${id}`) or openModal(id)
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-6 text-center">My Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myClasses.map(cls => (
                    <div key={cls._id} className="card bg-base-100 shadow-xl">
                        <figure><img src={cls.image} alt="Class" className="h-48 w-full object-cover" /></figure>
                        <div className="card-body space-y-2">
                            <h2 className="card-title">{cls.title}</h2>
                            <p><strong>Name:</strong> {cls.teacherName}</p>
                            <p><strong>Email:</strong> {cls.teacherEmail}</p>
                            <p><strong>Price:</strong> ${cls.price}</p>
                            <p><strong>Status:</strong>
                                <span className={`ml-2 badge ${cls.status === 'approved' ? 'badge-success' : cls.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                                    {cls.status}
                                </span>
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <button
                                    onClick={() => handleUpdate(cls._id)}
                                    className="btn btn-sm btn-info"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(cls._id)}
                                    className="btn btn-sm btn-error"
                                >
                                    Delete
                                </button>
                                <Link to={`/dashboard/my-class/${cls._id}`}>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        disabled={cls.status !== 'approved'}
                                    >
                                        See Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClasses;
