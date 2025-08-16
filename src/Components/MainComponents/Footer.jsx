import React from 'react';
import Logo from '../Shared/Logo';
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-horizontal footer-center bg-base-300 p-10 rounded-2xl mb-5">
                <aside>
                    <Logo />
                    <p className="font-bold">
                        Teach Flow Industries Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a href='https://www.instagram.com/teachflow'>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M16,4H8C5.791,4,4,5.791,4,8v8c0,2.209,1.791,4,4,4h8c2.209,0,4-1.791,4-4V8C20,5.791,18.209,4,16,4z M12,16c-2.209,0-4-1.791-4-4c0-2.209,1.791-4,4-4s4,1.791,4,4C16,14.209,14.209,16,12,16z" opacity=".3"></path><path d="M16,3H8C5.243,3,3,5.243,3,8v8c0,2.757,2.243,5,5,5h8c2.757,0,5-2.243,5-5V8C21,5.243,18.757,3,16,3z M19,16c0,1.654-1.346,3-3,3H8c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3h8c1.654,0,3,1.346,3,3V16z"></path><path d="M12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5S14.757 7 12 7zM12 15c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 15 12 15zM17 6A1 1 0 1 0 17 8 1 1 0 1 0 17 6z"></path>
                            </svg> */}
                            <FaInstagramSquare className='text-2xl'/>
                        </a>
                        <a href='https://www.x.com/teachflow'>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                                <g opacity=".3"><polygon fill="#fff" fillRule="evenodd" points="16.002,19 6.208,5 8.255,5 18.035,19" clipRule="evenodd"></polygon><polygon points="8.776,4 4.288,4 15.481,20 19.953,20 8.776,4"></polygon></g><polygon fillRule="evenodd" points="10.13,12.36 11.32,14.04 5.38,21 2.74,21" clipRule="evenodd"></polygon><polygon fillRule="evenodd" points="20.74,3 13.78,11.16 12.6,9.47 18.14,3" clipRule="evenodd"></polygon><path d="M8.255,5l9.779,14h-2.032L6.208,5H8.255 M9.298,3h-6.93l12.593,18h6.91L9.298,3L9.298,3z"></path>
                            </svg> */}
                            <FaXTwitter className='text-2xl' />
                        </a>
                        <a href='https://www.facebook.com/teachflow'>
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg> */}
                            <FaFacebookSquare className='text-2xl' />
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;