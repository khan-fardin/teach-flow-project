import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {

    const { user, logOutUser } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error?.response?.status;

        if (status === 403) {
            // navigate('/forbidden'); // Redirect
            navigate('/'); // Redirect
        }
        else if (status === 401) {
            logOutUser()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        // console.log('inside axios interceptor error', error);
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;