import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ContactUs = () => {

    const handleMessage = e => {
        e.preventDefault();
        toast.success("Message Send!", { position: "top-center" });
    };

    return (
        <div className="bg-base-100 text-gray-800">

            <Helmet>
                <title>Contact Us</title>
            </Helmet>

            {/* Header */}
            <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="max-w-2xl mx-auto text-lg opacity-90">
                    Have questions or need support? We’d love to hear from you. Reach out to the TeachFlow team anytime.
                </p>
            </section>

            {/* Contact Info & Form */}
            <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-gray-600">
                        We’re here to answer your questions and support your journey as a teacher or student.
                    </p>
                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-indigo-600 text-2xl" />
                        <span>support@teachflow.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaPhone className="text-indigo-600 text-2xl" />
                        <span>+1 (234) 567-890</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaMapMarkerAlt className="text-indigo-600 text-2xl" />
                        <span>123 TeachFlow St, Learning City</span>
                    </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleMessage} className=" bg-base-200 shadow-md rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-bold mb-4">Send us a Message</h2>
                    <div>
                        <label className="block font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Message</label>
                        <textarea
                            placeholder="Your message"
                            className="textarea textarea-bordered w-full"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Send Message
                    </button>
                </form>
            </section>

            {/* Map */}
            <section className="px-6 pb-16 max-w-6xl mx-auto">
                <iframe
                    title="TeachFlow Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086108708488!2d-122.41941548468246!3d37.7749292797598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809cbae56e2d%3A0x1234567890abcdef!2sSan%20Francisco%20City!5e0!3m2!1sen!2sus!4v1676463832625!5m2!1sen!2sus"
                    width="100%"
                    height="350"
                    allowFullScreen=""
                    loading="lazy"
                    className="rounded-2xl border-0 shadow-md"
                ></iframe>
            </section>
        </div>
    );
};

export default ContactUs;
