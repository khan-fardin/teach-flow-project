import React from 'react';
import { Helmet } from 'react-helmet-async'
import { FaSpinner } from 'react-icons/fa6';

const Loading = () => {
    return (
        <div>
            <Helmet>
                <title>Loading | TeachFlow</title>
            </Helmet>
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
                <div className="text-center space-y-4">
                    <FaSpinner className="animate-spin text-5xl text-blue-600 mx-auto" />
                    <h2 className="text-2xl font-semibold text-gray-700">Loading, please wait...</h2>
                </div>
            </div>
        </div>
    );
};

export default Loading;