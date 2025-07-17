import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaSearch, FaUserShield, FaUser, FaEnvelope } from 'react-icons/fa';

const AdminRoleManager = () => {
    const axiosSecure = useAxiosSecure();
    const [searchEmail, setSearchEmail] = useState('');
    const [emailToSearch, setEmailToSearch] = useState('');

    const { data: user, isLoading, refetch, error, isError } = useQuery({
        queryKey: ['searchedUser', emailToSearch],
        enabled: !!emailToSearch,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${emailToSearch}`);
            return res.data;
        },
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchEmail.trim()) return toast.warn('Please enter an email');
        setEmailToSearch(searchEmail.trim());
    };

    const updateRole = async (role) => {
        try {
            const res = await axiosSecure.patch(`/users/${user._id}`, { role });
            if (res.data.modifiedCount > 0) {
                toast.success(`User role updated to "${role}"`);
                refetch(); // Immediately update
            } else {
                toast.info('No changes were made.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to update user role');
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">🔐 Admin Role Manager</h2>

            <form onSubmit={handleSearch} className="flex items-center gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search user by email"
                    className="input input-bordered flex-1"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                    <FaSearch className="mr-2" /> Search
                </button>
            </form>

            {isLoading && <p className="text-sm">🔄 Searching...</p>}
            {isError && <p className="text-red-500">❌ User not found.</p>}

            {user && (
                <div className="bg-base-200 p-5 rounded-xl space-y-4 shadow-md">
                    <div className="flex items-center gap-3 text-lg">
                        <FaUser className="text-primary" />
                        <strong>Name:</strong>
                        <span>{user.name || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-3 text-lg">
                        <FaEnvelope className="text-primary" />
                        <strong>Email:</strong>
                        <span>{user.email}</span>
                    </div>

                    <div className="flex items-center gap-3 text-lg">
                        <FaUserShield className="text-primary" />
                        <strong>Role:</strong>
                        <span className={`badge ${user.role === 'admin' ? 'badge-success' : 'badge-warning'}`}>
                            {user.role}
                        </span>
                    </div>

                    <div className="flex gap-4 pt-2">
                        {user.role !== 'admin' ? (
                            <button className="btn btn-sm btn-success" onClick={() => updateRole('admin')}>
                                Make Admin
                            </button>
                        ) : (
                            <button className="btn btn-sm btn-warning" onClick={() => updateRole('user')}>
                                Remove Admin
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRoleManager;
