import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BeATeacher = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [application, setApplication] = useState(null);

    const { register, handleSubmit, reset } = useForm();

    const generateTeacherId = () => {
        const prefix = 'TCH';
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        const timestamp = Date.now().toString().slice(-4); // last 4 digits of timestamp
        return `${prefix}-${random}-${timestamp}`;
    };

    // Example
    console.log(generateTeacherId()); // e.g. TCH-KF9D3-1298

    useEffect(() => {
        // Fetch teacher application status
        axiosSecure.get(`/teacher-request/${user?.email}`)
            .then(res => setApplication(res.data))
            .catch(err => console.error(err));
    }, [user, axiosSecure]);

    const onSubmit = async (data) => {
        const requestData = {
            ...data,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            status: "pending",
            teacherID:generateTeacherId(),
            requestTime: new Date()
        };

        try {
            const res = await axiosSecure.post('/teacher-request', requestData);
            if (res.data.insertedId) {
                toast.success('Request submitted for review!');
                setApplication({ ...requestData });
                reset();
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again!');
        }
    };

    const handleReRequest = async () => {
        const confirm = await Swal.fire({
            title: 'Re-apply?',
            text: "Your previous request was rejected. Re-submit?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, re-apply',
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/teacher-request/${user.email}`, { status: 'pending' });
                if (res.data.modifiedCount > 0) {
                    toast.success('Request re-submitted!');
                    setApplication({ ...application, status: 'pending' });
                }
            } catch (error) {
                toast.error('Re-application failed!');
            }
        }
    };

    // Conditional UI based on application status
    if (application) {
        if (application.status === 'approved') {
            return (
                <div className="text-center mt-20">
                    <h2 className="text-2xl font-bold text-green-600">You are approved as a teacher!</h2>
                </div>
            );
        }

        if (application.status === 'pending') {
            return (
                <div className="text-center mt-20">
                    <h2 className="text-xl font-semibold text-yellow-600">Your application is under review.</h2>
                </div>
            );
        }

        if (application.status === 'rejected') {
            return (
                <div className="text-center mt-20 space-y-4">
                    <h2 className="text-xl font-semibold text-red-600">Your application was rejected.</h2>
                    <button onClick={handleReRequest} className="btn btn-warning">Request Another</button>
                </div>
            );
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Teach on EduVerse</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label className="font-semibold">Name</label>
                    <input type="text" defaultValue={user?.displayName} {...register("name")} readOnly className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Email</label>
                    <input type="email" defaultValue={user?.email} {...register("email")} readOnly className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Experience Level</label>
                    <select {...register("experience")} className="select select-bordered w-full">
                        <option value="beginner">Beginner</option>
                        <option value="mid-level">Mid-level</option>
                        <option value="experienced">Experienced</option>
                    </select>
                </div>

                <div>
                    <label className="font-semibold">Class Title</label>
                    <input type="text" {...register("title", { required: true })} placeholder="e.g. JavaScript Bootcamp" className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Category</label>
                    <select {...register("category")} className="select select-bordered w-full">
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Data Science">Data Science</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-full">Submit for Review</button>
            </form>
        </div>
    );
};

export default BeATeacher;
