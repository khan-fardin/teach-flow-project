import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useMutation } from '@tanstack/react-query';

const MyClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: classData = {}, isLoading, refetch } = useQuery({
        queryKey: ['classData', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${id}`);
            return res.data;
        }
    });

    const { data: enrollmentData, isLoading: loadingEnrollments } = useQuery({
        queryKey: ['enrollmentCount', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrollments/count/${classData.classId}`);
            return res.data.totalEnrollment;
        },
        enabled: !!classData.classId // only run if classData is loaded
    });

    const createAssignmentMutation = useMutation({
        mutationFn: async (formValues) => {
            const res = await axiosSecure.patch(`/classes/add-assignment/${id}`, formValues);
            return res.data;
        },
        onSuccess: (data) => {
            if (data.modifiedCount > 0) {
                toast.success('Assignment added!');
                refetch();
            } else {
                toast.error('Assignment not added.');
            }
        },
        onError: () => toast.error('Failed to create assignment')
    });

    const handleCreateAssignment = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Create New Assignment',
            html:
                `<input id="title" class="swal2-input" placeholder="Assignment Title">` +
                `<input id="deadline" type="date" class="swal2-input">` +
                `<textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>`,
            focusConfirm: false,
            preConfirm: () => {
                const title = document.getElementById('title').value;
                const deadline = document.getElementById('deadline').value;
                const description = document.getElementById('description').value;
                if (!title || !deadline || !description) {
                    Swal.showValidationMessage('All fields are required');
                    return false;
                }
                return { title, deadline, description };
            }
        });

        if (formValues) {
            createAssignmentMutation.mutate(formValues);
        }
    };

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="p-6 space-y-10">
            <Helmet>
                <title>Class Details</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-center mb-6">Class Progress Details</h2>
            <h1 className='text-xl font-black text-center'>{classData.title}</h1>
            <h1 className='text-sm text-center text-gray-500'>{classData.classId}</h1>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-200 p-5">
                    <h3 className="text-xl font-semibold mb-2">Total Enrollments</h3>
                    <p className="text-3xl font-bold">{enrollmentData || 0}</p>
                </div>
                <div className="card bg-base-200 p-5">
                    <h3 className="text-xl font-semibold mb-2">Total Assignments</h3>
                    <p className="text-3xl font-bold">{classData.assignments?.length || 0}</p>
                </div>
                <div className="card bg-base-200 p-5">
                    <h3 className="text-xl font-semibold mb-2">Total Submissions</h3>
                    <p className="text-3xl font-bold">{classData.totalSubmissions || 0}</p>
                </div>
            </div>

            {/* Assignments List */}
            {classData.assignments?.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-lg font-bold mb-4">Assignments</h3>
                    <ul className="space-y-4">
                        {classData.assignments.map((a, index) => (
                            <li key={index} className="border p-4 rounded bg-base-100">
                                <h4 className="text-xl font-semibold">{a.title}</h4>
                                <p className="text-sm text-gray-600">Deadline: {a.deadline}</p>
                                <p>{a.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Create Assignment Button */}
            <div className="text-center mt-10">
                <button className="btn btn-primary" onClick={handleCreateAssignment}>
                    Create Assignment
                </button>
            </div>
        </div>
    );
};

export default MyClassDetails;
