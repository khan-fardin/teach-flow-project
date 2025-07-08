import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/' className='flex items-center gap-2 w-fit'>
            <img src={logo} alt="" className='w-8' />
            <h1 className='text-2xl font-black'>TeachFlow</h1>
        </Link>
    );
};

export default Logo;