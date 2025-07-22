import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Loading from '../Loading';

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

    const { mutate: deleteClass, isPending } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/classes/${id}`);
            return res.data;
        },
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                toast.success("Class deleted successfully");
                refetch(); // refresh the class list
            }
        },
        onError: () => {
            toast.error("Failed to delete class");
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
            deleteClass(id);
        }
    };

    const handleUpdate = async (id, currentTitle, currentPrice) => {
        const { value: formValues } = await Swal.fire({
            title: 'Update Class',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Title" value="${currentTitle}" />
             <input id="swal-input2" type="number" class="swal2-input" placeholder="Price" value="${currentPrice}" />`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Update',
            preConfirm: () => {
                return {
                    title: document.getElementById('swal-input1').value,
                    price: parseFloat(document.getElementById('swal-input2').value),
                };
            }
        });
        if (formValues) {
            try {
                const res = await axiosSecure.patch(`/update-class/${id}`, formValues);
                if (res.data.modifiedCount > 0) {
                    toast.success('Class updated successfully');
                    refetch();
                } else {
                    toast.info('No changes were made');
                }
            } catch (err) {
                toast.error('Failed to update class');
            }
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-5">
            <Helmet>
                <title>My Classes</title>
            </Helmet>
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
                                    onClick={() => handleUpdate(cls._id, cls.title, cls.price)}
                                    className="btn btn-sm btn-info"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(cls._id)}
                                    className="btn btn-sm btn-error"
                                    disabled={isPending}
                                >
                                    {isPending ? "Deleting..." : "Delete"}
                                </button>
                                {cls.status === 'approved' ? (
                                    <Link to={`/dashboard/my-class/${cls._id}`}>
                                        <button className="btn btn-sm btn-secondary">
                                            See Details
                                        </button>
                                    </Link>
                                ) : (
                                    <button className="btn btn-sm btn-secondary" disabled>
                                        See Details
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClasses;
