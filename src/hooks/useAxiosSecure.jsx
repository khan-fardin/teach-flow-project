// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: `https://ph-assignment12-server-three.vercel.app`,
});

const useAxiosSecure = () => {
    const { user, logOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            config => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            res => res,
            error => {
                const status = error?.response?.status;

                if (status === 401) {
                    logOutUser()
                        .then(() => navigate('/login'))
                        .catch(() => { });
                } else if (status === 403) {
                    navigate('/forbidden');
                }

                return Promise.reject(error);
            }
        );

        // Cleanup on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user?.accessToken, logOutUser, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
