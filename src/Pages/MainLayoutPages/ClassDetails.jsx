import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [cls, setCls] = useState({});

    useEffect(() => {
        axiosSecure.get(`/classes/${id}`).then(res => setCls(res.data));
    }, [axiosSecure, id]);

    const handlePay = () => {
        navigate(`/payment/${id}`);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow">
            <img src={cls.image} alt="" className="w-full h-64 object-cover rounded" />
            <h2 className="text-2xl font-bold mt-4">{cls.title}</h2>
            <p><strong>Instructor:</strong> {cls.teacherName}</p>
            <p><strong>Email:</strong> {cls.teacherEmail}</p>
            <p><strong>Price:</strong> ${cls.price}</p>
            <p className="mt-4">{cls.description}</p>
            <button onClick={handlePay} className="btn btn-success mt-6 w-full">Pay</button>
        </div>
    );
};

export default ClassDetails;
