import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    FaUser,
    FaEnvelope,
    FaUserShield,
    FaBook,
    FaChalkboardTeacher,
    FaTasks,
} from 'react-icons/fa';

const Profile = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    const { data: userData, isLoading } = useQuery({
        queryKey: ['userData', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${user.email}`);
            setFormData(res.data);
            return res.data;
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.put(`/users/${userData._id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['userData', user?.email]);
            setEditMode(false);
        },
    });

    if (isLoading || loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner text-success text-4xl"></span>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate(formData);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 text-center text-white">
                    <img
                        src={formData?.photo || 'https://via.placeholder.com/120'}
                        alt="Profile"
                        className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-md object-cover"
                    />
                    <h2 className="text-3xl font-bold mt-4">{userData?.name || 'User'}</h2>
                    <p className="text-sm opacity-90">{userData?.email}</p>
                    <p className="mt-2 inline-block px-4 py-1 bg-white/20 rounded-full text-sm capitalize">
                        {userData?.role}
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 grid gap-6 md:grid-cols-2 bg-base-100"
                >
                    {/* Name */}
                    <div>
                        <label className="block font-semibold mb-1 flex items-center gap-2">
                            <FaUser /> Name
                        </label>
                        {editMode ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        ) : (
                            <p className="text-gray-700">{userData?.name || 'N/A'}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-semibold mb-1 flex items-center gap-2">
                            <FaEnvelope /> Email
                        </label>
                        <p className="text-gray-700">{userData?.email || 'N/A'}</p>
                    </div>

                    {/* Role Specific */}
                    {userData?.role === 'student' && (
                        <>
                            <div>
                                <label className="block font-semibold mb-1 flex items-center gap-2">
                                    <FaBook /> Grade
                                </label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="grade"
                                        value={formData.grade || ''}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                ) : (
                                    <p className="text-gray-700">{userData?.grade || 'N/A'}</p>
                                )}
                            </div>
                            <div>
                                <label className="block font-semibold mb-1 flex items-center gap-2">
                                    <FaTasks /> Enrollment No
                                </label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="enrollment"
                                        value={formData.enrollment || ''}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                ) : (
                                    <p className="text-gray-700">{userData?.enrollment || 'N/A'}</p>
                                )}
                            </div>
                        </>
                    )}

                    {userData?.role === 'teacher' && (
                        <>
                            <div>
                                <label className="block font-semibold mb-1 flex items-center gap-2">
                                    <FaChalkboardTeacher /> Subjects
                                </label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="subjects"
                                        value={formData.subjects || ''}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                ) : (
                                    <p className="text-gray-700">{userData?.subjects || 'N/A'}</p>
                                )}
                            </div>
                            <div>
                                <label className="block font-semibold mb-1 flex items-center gap-2">
                                    <FaTasks /> Experience
                                </label>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience || ''}
                                        onChange={handleChange}
                                        className="input input-bordered w-full"
                                    />
                                ) : (
                                    <p className="text-gray-700">
                                        {userData?.experience || 'N/A'} years
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    {userData?.role === 'admin' && (
                        <div className="md:col-span-2">
                            <label className="block font-semibold mb-1 flex items-center gap-2">
                                <FaTasks /> Responsibilities
                            </label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="responsibilities"
                                    value={formData.responsibilities || ''}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                />
                            ) : (
                                <p className="text-gray-700">
                                    {userData?.responsibilities || 'Manage Platform'}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="md:col-span-2 flex justify-end gap-3 mt-6">
                        {editMode ? (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => setEditMode(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={updateMutation.isLoading}
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setEditMode(true)}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
