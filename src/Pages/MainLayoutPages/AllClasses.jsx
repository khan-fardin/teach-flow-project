import React, { useState } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../Loading';
import { IoMdOptions } from "react-icons/io";

const ITEMS_PER_PAGE = 6;

const AllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('default');

    const { data: allClasses = [], isLoading } = useQuery({
        queryKey: ['approved-classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/approved-classes');
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    // Sort logic
    let sortedClasses = [...allClasses];
    if (sortOption === 'high-to-low') {
        sortedClasses.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'low-to-high') {
        sortedClasses.sort((a, b) => a.price - b.price);
    };

    const totalPages = Math.ceil(sortedClasses.length / ITEMS_PER_PAGE);
    const paginatedClasses = sortedClasses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="p-6">
            <Helmet>
                <title>All Classes | TeachFlow</title>
            </Helmet>

            <div className='mb-5'>
                {/* Filter Dropdown */}
                <details className="dropdown mb-4">
                    <summary className="btn m-1">Filter <IoMdOptions /></summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                        <li>
                            <button onClick={() => setSortOption('default')}>Default</button>
                        </li>
                        <li>
                            <button onClick={() => setSortOption('high-to-low')}>Price High to Low</button>
                        </li>
                        <li>
                            <button onClick={() => setSortOption('low-to-high')}>Price Low to High</button>
                        </li>
                    </ul>
                </details>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedClasses.map(cls => (
                    <div key={cls._id} className="card bg-accent-content shadow-lg rounded-xl overflow-hidden transition hover:shadow-xl">
                        <img src={cls.image} className="h-48 w-full object-cover" alt={cls.title} />
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-gray-800 h-15">{cls.title}</h2>
                            <p className="text-sm text-gray-600 mb-2 h-15">{cls.description?.slice(0, 60)}...</p>
                            <p className="text-gray-700 font-medium"><span className="font-semibold">Instructor:</span> {cls.teacherName}</p>
                            <p className="text-gray-700"><span className="font-semibold">Price:</span> ${cls.price}</p>
                            <p className="text-gray-700 mb-3"><span className="font-semibold">Total Enrollments:</span> {cls.totalEnrollment || 0}</p>
                            <Link to={`/class-details/${cls._id}`}>
                                <button className="btn btn-primary w-full">Enroll</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 gap-2">
                {[...Array(totalPages).keys()].map(pageNum => {
                    const page = pageNum + 1;
                    return (
                        <button
                            key={page}
                            className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AllClasses;
