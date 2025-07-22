import React from 'react';
import { useParams, Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaCreditCard } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

const ClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: cls, isLoading, isError, error } = useQuery({
        queryKey: ['class-details', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="mx-auto p-6">
                <div className="skeleton h-64 w-full mb-4 rounded"></div>
                <div className="skeleton h-6 w-3/4 mb-2"></div>
                <div className="skeleton h-4 w-1/2 mb-2"></div>
                <div className="skeleton h-4 w-1/3 mb-2"></div>
                <div className="skeleton h-24 w-full mb-4"></div>
                <div className="skeleton h-10 w-full"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-600 font-semibold">
                Failed to load class details: {error.message}
            </div>
        );
    }

    if (!cls) return null;

    return (
        <div className="my-5 mx-auto p-6 bg-base-200 rounded-lg shadow-md">
            <Helmet>
                <title>Class Details</title>
            </Helmet>
            <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-[50vw] object-cover rounded-lg shadow mb-4"
            />
            <h2 className="text-3xl font-bold text-primary mb-2">{cls.title}</h2>
            <p className="text-lg text-gray-700"><strong>Instructor:</strong> {cls.teacherName}</p>
            <p className="text-sm text-gray-500 mb-1"><strong>Email:</strong> {cls.teacherEmail}</p>
            <p className="text-xl font-semibold text-success mt-2 mb-4">
                Price: ${parseFloat(cls.price).toFixed(2)}
            </p>
            <p className="text-gray-600 mb-6">{cls.description}</p>

            <Link to={`/payment/${cls.classId}`}
                className="btn btn-success w-full text-lg"
            >
                <FaCreditCard className="mr-2" /> Pay Now
            </Link>
        </div>
    );
};

export default ClassDetails;
