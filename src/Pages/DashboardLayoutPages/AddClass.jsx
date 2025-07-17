import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const generateClassId = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const time = Date.now().toString().slice(-4);
    return `CLS-${random}-${time}`;
};

const AddClass = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const classData = {
            classId: generateClassId(),
            title: data.title,
            teacherName: user?.displayName,
            teacherEmail: user?.email,
            price: parseFloat(data.price),
            description: data.description,
            image: data.image,
            status: 'pending',
            requestTime: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post('/classes', classData);
            if (res.data.insertedId) {
                toast.success("Class added successfully!");
                reset();
                navigate('/dashboard/my-classes');
            }
        } catch (error) {
            toast.error("Failed to add class.");
        }
    };

    return (
        <div className="mx-auto bg-base-200 p-6 rounded-xl mt-10 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Add a Class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="label">Title</label>
                    <input type="text" {...register("title", { required: true })} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Your Name</label>
                    <input type="text" value={user?.displayName || ''} readOnly className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Email</label>
                    <input type="email" value={user?.email || ''} readOnly className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Price ($)</label>
                    <input type="number" step="0.01" {...register("price", { required: true })} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Image URL</label>
                    <input type="text" {...register("image", { required: true })} className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Description</label>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" rows={4}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">Add Class</button>
            </form>
        </div>
    );
};

export default AddClass;
