import React from 'react';
import { Link } from 'react-router';

const InspireTeachers = () => {

    return (
        <section className="bg-base-200 py-16 px-6 rounded-2xl">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">
                {/* Left: Text */}
                <div>
                    <h2 className="text-4xl font-bold mb-4 text-primary">
                        Share Your Knowledge. Inspire The Future.
                    </h2>
                    <p className="text-base-content/80 text-lg mb-6">
                        Are you passionate about teaching? Join our platform and reach thousands of eager learners around the globe. Whether you're an industry expert or an academic professional, your experience can make a difference.
                    </p>
                    <ul className="mb-6 list-disc ml-5 space-y-2 text-base-content">
                        <li>Build your own course content</li>
                        <li>Grow your professional reputation</li>
                        <li>Get rewarded for your skills</li>
                    </ul>
                    <Link
                        to="/be-a-teacher"
                        className="btn btn-primary rounded-xl text-base"
                    >
                        Apply to Teach
                    </Link>
                </div>

                {/* Right: Image */}
                <div className="flex justify-center">
                    <img
                        src="https://img.freepik.com/free-vector/online-class-illustration_52683-42415.jpg?t=st=1752762455~exp=1752766055~hmac=d0f8e26d86e48c40f09dd3420e5f874ba04be3999bda7fa20ae441a030991260&w=826"
                        alt="Teach on Platform"
                        className="w-full max-w-md rounded-xl shadow-xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default InspireTeachers;
