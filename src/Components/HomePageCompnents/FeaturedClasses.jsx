import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const FeaturedClasses = () => {
    const axios = useAxios();

    const { data: classes = [], isLoading, isError } = useQuery({
        queryKey: ['popular-classes'],
        queryFn: async () => {
            const res = await axios.get('/popular-classes');
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center py-10">Loading popular classes...</p>;
    }

    if (isError) {
        return <p className="text-center py-10 text-red-500">Failed to load popular classes.</p>;
    }

    return (
        <section className="py-12 px-4 bg-base-200 rounded-2xl">
            <h2 className="text-3xl font-bold text-center mb-6">Popular Classes</h2>

            <div className="overflow-x-auto flex">
                <div className="flex gap-6 min-w-max px-2">
                    {classes.map((cls) => (
                        <div
                            key={cls._id}
                            className="min-w-[300px] max-w-[300px] bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={cls.image}
                                alt={cls.title}
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 text-base-content h-15">{cls.title}</h3>
                                <p className="text-base-content/70 text-sm mb-2 h-15">
                                    {cls.description?.slice(0, 80)}...
                                </p>
                                <p className="text-sm text-base-content mb-2">👤 Instructor: {cls.teacherName}</p>
                                <p className="text-sm text-base-content mb-2">🎓 Enrolled: {cls.enrolledCount}</p>
                                <Link
                                    to={`/class-details/${cls._id}`}
                                    className="btn btn-sm bg-primary text-base-content hover:scale-105 transition rounded-xl"
                                >
                                    See Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 👉 CTA - Find More Button */}
                <div className="min-w-[300px] flex items-center justify-center px-4">
                    <Link
                        to="/all-classes"
                        className="flex flex-col items-center justify-center hover:text-primary-focus transition"
                    >
                        <FaArrowRight className="text-5xl mb-2" />
                        <p className="font-semibold text-lg">Find More</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedClasses;
