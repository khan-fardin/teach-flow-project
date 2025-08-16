import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaChalkboardTeacher, FaUserGraduate, FaBookOpen, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router';

const About = () => {
    return (
        <div className="bg-base-100 text-gray-800">

            <Helmet>
                <title>About Us</title>
            </Helmet>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to TeachFlow</h1>
                <p className="max-w-2xl mx-auto text-lg opacity-90">
                    TeachFlow is an innovative EdTech platform where passionate teachers share knowledge
                    and students unlock opportunities to learn, grow, and succeed.
                </p>
            </section>

            {/* Mission */}
            <section className="py-12 px-6 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600">
                    We aim to bridge the gap between learners and educators by providing a seamless, flexible,
                    and interactive platform. Whether you are a student eager to explore new subjects or a teacher
                    ready to inspire minds, TeachFlow is your space to thrive.
                </p>
            </section>

            {/* Features */}
            <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl shadow-md bg-base-300 hover:shadow-lg transition">
                    <FaChalkboardTeacher className="text-indigo-600 text-4xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">For Teachers</h3>
                    <p className="text-gray-600">
                        Publish your own classes, share knowledge globally, and manage your students easily.
                        TeachFlow empowers you with tools to create engaging lessons and track performance.
                    </p>
                </div>

                <div className="p-6 rounded-2xl shadow-md bg-base-300 hover:shadow-lg transition">
                    <FaUserGraduate className="text-blue-500 text-4xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">For Students</h3>
                    <p className="text-gray-600">
                        Access a wide range of courses, learn from expert teachers, and grow your skills.
                        Join classes that fit your goals and pace your journey towards excellence.
                    </p>
                </div>

                <div className="p-6 rounded-2xl shadow-md bg-base-300 hover:shadow-lg transition">
                    <FaBookOpen className="text-green-500 text-4xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Diverse Courses</h3>
                    <p className="text-gray-600">
                        From coding to creativity, explore classes across multiple categories and subjects.
                        There’s always something new to learn on TeachFlow.
                    </p>
                </div>

                <div className="p-6 rounded-2xl shadow-md bg-base-300 hover:shadow-lg transition">
                    <FaGlobe className="text-yellow-500 text-4xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Global Community</h3>
                    <p className="text-gray-600">
                        Connect with educators and learners worldwide. Collaborate, share, and grow together in a
                        global learning environment.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-base-100 py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">Start Your Journey with TeachFlow</h2>
                <p className="text-gray-600 mb-6">
                    Whether you want to teach or learn, TeachFlow is the platform to make it happen.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to='/be-a-teacher' className="btn btn-primary">Become a Teacher</Link>
                    <Link to='/all-classes' className="btn btn-outline">Join as Student</Link>
                </div>
            </section>
        </div>
    );
};

export default About;
