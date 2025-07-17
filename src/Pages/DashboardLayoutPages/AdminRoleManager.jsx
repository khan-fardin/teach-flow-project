import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminRoleManager = () => {
    
    const axiosSecure = useAxiosSecure();
    const [searchEmail, setSearchEmail] = useState('');
    const [emailToSearch, setEmailToSearch] = useState('');

    const { data: user, isLoading, refetch, error } = useQuery({
        queryKey: ['searchedUser', emailToSearch],
        enabled: !!emailToSearch,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${emailToSearch}`);
            return res.data;
        },
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchEmail) return toast.warn('Please enter an email');
        setEmailToSearch(searchEmail.trim());
    };

    const updateRole = async (role) => {
        try {
            const res = await axiosSecure.patch(`/users/${user._id}`, { role });
            setTimeout(() => refetch(), 1000); // delay refetch for 300ms
            if (res.data.modifiedCount > 0) {
                toast.success(`User role updated to "${role}"`);
                refetch(); // reload the user data
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
            <h2 className="text-2xl font-bold mb-4">Admin Role Manager</h2><p className='text-6xl text-red-500'>issue</p>

            <form onSubmit={handleSearch} className="flex items-center gap-3 mb-5">
                <input
                    type="text"
                    placeholder="Search user by email"
                    className="input input-bordered flex-1"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">Search</button>
            </form>

            {isLoading && <p className="text-sm">Searching...</p>}
            {error && <p className="text-red-500">User not found</p>}

            {user && (
                <div className="bg-base-200 p-4 rounded-xl space-y-2">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Current Role:</strong> <span className="badge badge-outline">{user.role}</span></p>

                    <div className="flex gap-3 mt-3">
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
