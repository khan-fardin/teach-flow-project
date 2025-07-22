import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import ReactStars from 'react-stars';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loading from '../Loading';
import useAuth from '../../hooks/useAuth';

const MyEnrolledClassDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // State management
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    // Fetch class data
    const { data: classInfo, isLoading } = useQuery({
        queryKey: ['classInfo', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/by-classId/${id}`);
            return res.data;
        },
    });

    // Handle assignment submission with SweetAlert
    const submitAssignmentMutation = useMutation({
        mutationFn: async ({ assignmentId, submissionText }) => {
            const res = await axiosSecure.post(`/assignments/submit`, {
                assignmentIndex:assignmentId,
                classId: id,
                studentEmail: user.email,
                studentName: user.displayName,
                submissionText,
                submissionTime: new Date()
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success('✅ Assignment submitted successfully!');
            queryClient.invalidateQueries(['classInfo', id]);
        },
        onError: () => {
            toast.error('❌ Failed to submit assignment');
        },
    });

    const handleAssignmentSubmit = (assignmentId) => {
        Swal.fire({
            title: 'Submit Assignment',
            html: `
                <textarea 
                    id="submission-text" 
                    class="swal2-textarea" 
                    placeholder="Enter your submission here..."
                    rows="4"
                ></textarea>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const text = document.getElementById('submission-text').value;
                if (!text) {
                    Swal.showValidationMessage('Submission text is required');
                    return false;
                }
                return text;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                submitAssignmentMutation.mutate({
                    assignmentId,
                    submissionText: result.value
                });
            }
        });
    };

    // Feedback submission
    const feedbackMutation = useMutation({
        mutationFn: async ({ comment, rating }) => {
            const feedbackData = {
                student: user.displayName,
                image: user.photoURL,
                classId: id,
                title: classInfo?.title,
                rating,
                comment,
                reviewedAt: new Date(),
            };
            const res = await axiosSecure.post('/feedback', feedbackData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('✅ Feedback submitted for review!');
            setShowModal(false);
            setRating(0);
            setFeedback("");
            queryClient.invalidateQueries(['classFeedback', id]);
        },
        onError: (error) => {
            if (error.response?.status === 409) {
                toast.error("You've already submitted feedback for this class");
            } else {
                toast.error("Failed to submit feedback");
            }
        }
    });

    const handleFeedbackSubmit = () => {
        if (typeof feedback !== 'string' || !feedback.trim()) {
            toast.error('Please provide valid feedback.');
            return;
        }
        if (rating === 0) {
            toast.error('Please provide a rating.');
            return;
        }
        feedbackMutation.mutate({ comment: feedback, rating });
    };

    if (isLoading) return <Loading />;
    const assignments = classInfo?.assignments || [];

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Helmet>
                <title>My Class Detail</title>
            </Helmet>
            <h1 className="text-3xl font-bold mb-6">{classInfo?.title} - Assignments</h1>

            {/* Assignments Table (Desktop) */}
            <div className="hidden md:block overflow-x-auto mb-8">
                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-left">Deadline</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {assignments.map((assignment, idx) => (
                            <tr key={idx}>
                                <td className="py-4 px-4">{assignment.title}</td>
                                <td className="py-4 px-4">{assignment.description}</td>
                                <td className="py-4 px-4">
                                    {new Date(assignment.deadline).toLocaleDateString()}
                                    {new Date(assignment.deadline) < new Date() && (
                                        <span className="ml-2 text-red-500 text-sm">(Expired)</span>
                                    )}
                                </td>
                                <td className="py-4 px-4">
                                    <button
                                        onClick={() => handleAssignmentSubmit(idx)}
                                        disabled={submitAssignmentMutation.isLoading}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                                    >
                                        Submit Assignment
                                    </button>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Submissions: {assignment.submissionCount || 0}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Assignments Cards (Mobile) */}
            <div className="md:hidden space-y-4 mb-8">
                {assignments.map((assignment, idx) => (
                    <div key={idx} className="bg-white shadow rounded-lg p-4">
                        <h3 className="text-lg font-semibold">{assignment.title}</h3>
                        <p className="text-gray-700 mt-1">{assignment.description}</p>
                        <p className="text-sm mt-2">
                            <span className="font-medium">Deadline:</span> {new Date(assignment.deadline).toLocaleDateString()}
                            {new Date(assignment.deadline) < new Date() && (
                                <span className="ml-2 text-red-500">(Expired)</span>
                            )}
                        </p>
                        <div className="mt-3">
                            <button
                                onClick={() => handleAssignmentSubmit(idx)}
                                disabled={submitAssignmentMutation.isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                            >
                                Submit Assignment
                            </button>
                            <p className="text-sm text-gray-500 mt-1 text-center">
                                Submissions: {assignment.submissionCount || 0}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Feedback Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-4">Teaching Evaluation</h3>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Rating:</label>
                                <div className="flex justify-center">
                                    <ReactStars
                                        count={5}
                                        value={rating}
                                        onChange={setRating}
                                        size={36}
                                        color2={'#f59e0b'}
                                        color1={'#e5e7eb'}
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Feedback:</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500"
                                    rows="5"
                                    placeholder="Your feedback..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleFeedbackSubmit}
                                    disabled={feedbackMutation.isLoading}
                                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Feedback Button */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="ml-2">Give Feedback</span>
            </button>
        </div>
    );
};

export default MyEnrolledClassDetail;