import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import { Bounce, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { registerUser, updateUser, signInWithGoogle, setUser } = useAuth();
    const navigate = useNavigate();
    const [agree, setAgree] = useState(false);
    const axiosInstance = useAxios();

    const onSubmit = (data) => {
        if (!agree) {
            return toast.error('You must accept the terms and conditions.');
        }
        try {
            const { name, email, password } = data;
            registerUser(email, password)
                .then(async (result) => {
                    const user = result.user
                    toast.success(`Registered as ${name}`, {
                        position: "bottom-center",
                        autoClose: 1500,
                        transition: Bounce,
                    });
                    updateUser({ displayName: name })
                        .then(() => {
                            setUser({ ...user, displayName: name });
                            reset();
                            navigate("/");
                        })
                        .catch((error) => {
                            console.log(error);
                            setUser(user);
                        });
                    // user info in database
                    const userInfo = {
                        name, email, role: 'user', userCreatedAt: new Date().toISOString(), lastLogIn: new Date().toISOString()
                    };
                    const userRes = await axiosInstance.post('/users', userInfo);
                    console.log(userRes.data);
                })
        } catch (error) {
            toast.error(error.message || 'Registration failed.');
        }
    };

    const handleGoogleSignUp = async () => {
        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;

                // Optional: Show success toast
                toast.success(`Registered as ${user.displayName}`, {
                    position: "bottom-center",
                    autoClose: 1500,
                    transition: Bounce,
                });

                // ✅ Step: Save or update user in your backend
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    role: 'user', // Default role
                    userCreatedAt: new Date().toISOString(),
                    lastLogIn: new Date().toISOString(),
                };

                try {
                    const userRes = await axiosInstance.post('/users', userInfo);
                    console.log("User saved/updated:", userRes.data);
                } catch (err) {
                    console.error("Failed to save user:", err);
                    toast.error("User save failed to DB");
                }

                setUser(user);  // Firebase user
                navigate("/");
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage || "Signup failed");
            });
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-5 bg-base-200">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
                <img src="https://img.freepik.com/free-photo/3d-render-secure-login-password-illustration_107791-16640.jpg?t=st=1752055695~exp=1752059295~hmac=59dc390f6b0c10894182cf634fb96e803c3a81973fd3fd9c5753288c64c148b2&w=826" alt="Register Illustration" className="w-full max-w-lg" />
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 max-w-md bg-white p-8 rounded-2xl shadow-xl">
                {/* Logo and Intro */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-primary">EduSpark</h1>
                    <p className="text-sm text-gray-600">Join Our Teaching Community</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name */}
                    <div className="form-control">
                        <label className="label">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input input-bordered w-full pr-10"
                                {...register('name', { required: 'Name is required' })}
                            />
                            <FaUser className="absolute right-3 top-3 text-gray-400" />
                        </div>
                        {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full pr-10"
                                {...register('email', { required: 'Email is required' })}
                            />
                            <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
                        </div>
                        {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full pr-10"
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                        message: 'Must contain uppercase, lowercase, number & 6+ chars'
                                    }
                                })}
                            />
                            <FaLock className="absolute right-3 top-3 text-gray-400" />
                        </div>
                        {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="form-control">
                        <label className="label">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Re-enter password"
                                className="input input-bordered w-full pr-10"
                                {...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: (value) => value === watch('password') || 'Passwords do not match'
                                })}
                            />
                            <FaLock className="absolute right-3 top-3 text-gray-400" />
                        </div>
                        {errors.confirmPassword && <p className="text-error text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Terms Checkbox */}
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <input type="checkbox" className="checkbox checkbox-primary" onChange={(e) => setAgree(e.target.checked)} />
                            <span className="label-text ml-2">I agree to the Terms and Conditions</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full" disabled={!agree}>Register</button>
                    <div>Already Registered? <Link to='/login' className='text-primary'>Login Here</Link></div>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Google Sign Up */}
                    <button onClick={handleGoogleSignUp} type="button" className="btn btn-outline btn-secondary w-full flex items-center gap-2">
                        <FaGoogle /> Sign up with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
