import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axiosSecure.get('/approved-classes')
            .then(res => setClasses(res.data))
            .catch(() => {});
    }, [axiosSecure]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {classes.map(cls => (
                <div key={cls._id} className="card bg-base-200 shadow-md p-4">
                    <img src={cls.image} className="h-48 w-full object-cover rounded" alt="" />
                    <h2 className="text-xl font-bold mt-3 h-[60px]">{cls.title}</h2>
                    <p><span className="font-semibold">Instructor:</span> {cls.teacherName}</p>
                    <p><span className="font-semibold">Price:</span> ${cls.price}</p>
                    <p className="text-sm my-2 h-[50px]">{cls.description?.slice(0, 60)}...</p>
                    <p><span className="font-semibold">Total Enrollments:</span> {cls.totalEnrollment || 0}</p>
                    <Link to={`/class-details/${cls._id}`}>
                        <button className="btn btn-primary mt-2 w-full">Enroll</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default AllClasses;
