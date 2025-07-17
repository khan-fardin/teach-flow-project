import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [classData, setClassData] = useState({});
    const [submissionCount, setSubmissionCount] = useState(0);

    useEffect(() => {
        // Get full class data with embedded assignments
        axiosSecure.get(`/classes/${id}`)
            .then(res => setClassData(res.data))
            .catch(() => toast.error('Failed to load class data'));

        // Get submission count
        axiosSecure.get(`/submissions/count/${id}`)
            .then(res => setSubmissionCount(res.data.count))
            .catch(() => toast.error('Failed to load submission count'));
    }, [axiosSecure, id]);

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
                }
                return { title, deadline, description };
            }
        });

        if (formValues) {
            try {
                const res = await axiosSecure.patch(`/classes/add-assignment/${id}`, formValues);
                if (res.data.modifiedCount > 0) {
                    toast.success('Assignment added!');
                    // Update UI manually
                    setClassData(prev => ({
                        ...prev,
                        assignments: [...(prev.assignments || []), { ...formValues, createdAt: new Date() }],
                    }));
                }
            } catch {
                toast.error('Failed to create assignment');
            }
        }
    };

    return (
        <div className="p-6 space-y-10">
            <h2 className="text-2xl font-bold text-center mb-6">Class Progress Details</h2>
            <h1 className='text-xl font-black text-center'>{classData.title}</h1>
            <h1 className='text-sm text-center text-gray-500'>{classData.classId}</h1>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-200 p-5">
                    <h3 className="text-xl font-semibold mb-2">Total Enrollments</h3>
                    <p className="text-3xl font-bold">{classData.totalEnrollment || 0}</p>
                </div>
                <div className="card bg-base-200 p-5">
                    <h3 className="text-xl font-semibold mb-2">Total Assignments</h3>
                    <p className="text-3xl font-bold">{classData.assignments?.length || 0}</p>
                </div>
                <div className="card bg-base-200 p-5">
                    <h3 className="text-xl font-semibold mb-2">Total Submissions</h3>
                    <p className="text-3xl font-bold">{submissionCount}</p>
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
