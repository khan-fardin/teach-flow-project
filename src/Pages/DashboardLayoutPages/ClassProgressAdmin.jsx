import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading';

const ClassProgressAdmin = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: classData, isLoading, isError, error } = useQuery({
        queryKey: ['class', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${id}`);
            return res.data;
        },
        enabled: !!id, // only run if id exists
    });

    if (isLoading) return <Loading />;
    if (isError) return <p>Error: {error?.message || 'Failed to load class data'}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Class: {classData?.title || classData?.className || id}
            </h1>

            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                Assignments
            </h2>

            {classData?.assignments?.length > 0 ? (
                <ul className="space-y-6">
                    {classData.assignments.map((assignment, index) => (
                        <li
                            key={index}
                            className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-semibold mb-2 text-indigo-700">
                                {assignment.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-1">
                                Deadline: <span className="font-medium">{assignment.deadline}</span>
                            </p>
                            <p className="text-gray-700 whitespace-pre-line">{assignment.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 italic mt-10">
                    No assignments found for this class.
                </p>
            )}
        </div>

    );
};

export default ClassProgressAdmin;
