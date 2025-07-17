import React from 'react';
import Navbar from '../Components/MainComponents/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/MainComponents/Footer';

const MainLayout = () => {
    return (
        <div className='lg:mx-[2.5%]'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;