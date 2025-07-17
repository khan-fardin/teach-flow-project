import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaLock, FaEnvelope } from 'react-icons/fa';
import { Bounce, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate, useLocation, Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import { GoogleAuthProvider } from 'firebase/auth';
import useAxios from '../hooks/useAxios';
import Logo from '../Components/Shared/Logo';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { loginUser, signInWithGoogle, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const axiosInstance =useAxios();

    const onSubmit = (data) => {
        const { email, password } = data;
        loginUser(email, password)
            .then((result) => {
                const user = result.user;
                toast.success(`Welcome back ${user.displayName || user.email}`, {
                    position: "bottom-center",
                    autoClose: 1500,
                    transition: Bounce,
                });
                setUser(user);
                navigate(from);
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/user-not-found') {
                    toast.error('Email is not registered');
                } else if (errorCode === 'auth/wrong-password') {
                    toast.error('Incorrect password');
                } else if (errorCode === 'auth/invalid-email') {
                    toast.error('Invalid email format');
                } else if (errorCode === 'auth/too-many-requests') {
                    toast.error('Too many login attempts. Try again later.');
                } else {
                    toast.error('Login failed. Please try again.');
                }
            });
    };

    const handleGoogleLogin = async () => {
        signInWithGoogle()
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                toast.success(`Logged in as ${user.displayName || user.email}`, {
                    position: "bottom-center",
                    autoClose: 1500,
                    transition: Bounce,
                });
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
                setUser(user);
                navigate(from);
            }).catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage || "Google login failed");
            });
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-5 bg-base-200">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
                <img src="https://img.freepik.com/free-photo/3d-render-secure-login-password-illustration_107791-16640.jpg?t=st=1752055695~exp=1752059295~hmac=59dc390f6b0c10894182cf634fb96e803c3a81973fd3fd9c5753288c64c148b2&w=826" alt="Login Illustration" className="w-full max-w-lg" />
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 max-w-md bg-white p-8 rounded-2xl shadow-xl">
                {/* Logo and Intro */}
                <Logo/>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                                {...register('password', { required: 'Password is required' })}
                            />
                            <FaLock className="absolute right-3 top-3 text-gray-400" />
                        </div>
                        {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">Login</button>
                    <div>Not Yet Registered? <Link to='/register' className='text-primary'>Register Here</Link></div>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Google Login */}
                    <button onClick={handleGoogleLogin} type="button" className="btn btn-outline btn-secondary w-full flex items-center gap-2">
                        <FaGoogle /> Sign in with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
