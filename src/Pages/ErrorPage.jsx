import React from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa6';

const ErrorPage = () => {
    return (
        <div>
            <Helmet>
                <title>Error</title>
            </Helmet>
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-base-200">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <h2 className="text-2xl mt-4 mb-2 font-semibold">Oops! Page not found</h2>
                <p className="text-gray-600 max-w-md">
                    The page you’re looking for doesn’t exist or might have been moved.
                </p>
                <Link to="/" className="btn btn-outline btn-primary mt-6 flex items-center gap-2">
                    <FaArrowLeft /> Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;